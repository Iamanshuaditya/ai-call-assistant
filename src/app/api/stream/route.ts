import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { getHotelResponse } from '@/lib/gemini';
import { WebSocket, WebSocketServer } from 'ws';

// Store active streams
const activeStreams = new Map();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const callSid = formData.get('CallSid')?.toString();
    const speechResult = formData.get('SpeechResult')?.toString();
    
    if (!callSid) {
      return NextResponse.json(
        { error: 'CallSid is required' },
        { status: 400 }
      );
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      return NextResponse.json(
        { error: 'Twilio credentials not configured' },
        { status: 500 }
      );
    }

    const twiml = new twilio.twiml.VoiceResponse();

    if (!speechResult) {
      // Initial greeting
      twiml.say(
        { voice: 'Polly.Aditi', language: 'hi-IN' },
        'Namaste, humare luxury hotel mein aapka swagat hai. Main aapki kya madad kar sakti hoon?'
      );
      
      twiml.gather({
        input: ['speech'],
        action: '/api/stream',
        method: 'POST',
        speechTimeout: 'auto',
        language: 'hi-IN'
      });
    } else {
      // Process the user's speech input
      const aiResponse = await getHotelResponse(speechResult);
      
      twiml.say(
        { voice: 'Polly.Aditi', language: 'hi-IN' },
        aiResponse
      );

      // Continue the conversation
      twiml.gather({
        input: ['speech'],
        action: '/api/stream',
        method: 'POST',
        speechTimeout: 'auto',
        language: 'hi-IN'
      });
    }

    return new NextResponse(twiml.toString(), {
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error) {
    console.error('Stream error:', error);
    return NextResponse.json(
      { error: 'Failed to handle stream' },
      { status: 500 }
    );
  }
}

// Define custom WebSocket type with streamSid
interface CustomWebSocket extends WebSocket {
  streamSid?: string;
}

// WebSocket handler for real-time audio streaming
export async function GET(request: Request) {
  try {
    if (request.headers.get('upgrade') !== 'websocket') {
      return new Response('Expected Websocket', { status: 426 });
    }

    const wss = new WebSocketServer({ noServer: true });
    
    wss.on('connection', (socket: CustomWebSocket) => {
      socket.on('message', async (data: Buffer) => {
        try {
          const streamSid = socket.streamSid;
          const stream = activeStreams.get(streamSid);
          
          if (!stream) {
            console.error(`No active stream found for SID: ${streamSid}`);
            return;
          }

          if (stream === null) {
            console.error(`Stream is null for SID: ${streamSid}`);
            return;
          }

          // Append incoming audio data to buffer
          stream.buffer = Buffer.concat([stream.buffer, data]);

          // Process audio when we have enough data
          if (stream.buffer.length >= 4096) {
            // Convert audio buffer to text (you'll need to implement speech-to-text)
            // For now, we'll use a placeholder
            const text = 'Sample user query'; // Replace with actual speech-to-text

            // Get AI response
            const response = await getHotelResponse(text);

            // Convert response to speech (you'll need to implement text-to-speech)
            // For now, we'll send text response
            socket.send(JSON.stringify({ type: 'response', text: response }));

            // Clear buffer
            stream.buffer = Buffer.alloc(0);
          }
        } catch (error) {
          console.error('WebSocket message error:', error);
        }
      });

      socket.on('close', () => {
        const streamSid = socket.streamSid;
        if (streamSid) {
          activeStreams.delete(streamSid);
          console.log(`Stream ${streamSid} closed`);
        }
      });

      socket.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
    });

    return new Response(null, {
      status: 101,
      headers: {
        'Upgrade': 'websocket',
        'Connection': 'Upgrade'
      }
    });

  } catch (error) {
    console.error('WebSocket error:', error);
    return new Response('WebSocket connection failed', { status: 500 });
  }
}
