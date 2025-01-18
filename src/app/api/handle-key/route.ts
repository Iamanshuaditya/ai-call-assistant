import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { getHotelResponse } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const speechInput = formData.get('SpeechResult');
    
    const twiml = new twilio.twiml.VoiceResponse();
    
    if (!speechInput) {
      // If no speech detected, prompt again
      twiml.say(
        { voice: 'alice' },
        'I did not catch that. Could you please repeat your question about our hotel services?'
      );
    } else {
      // Get AI response for the speech input
      const aiResponse = await getHotelResponse(speechInput.toString());
      
      twiml.say({ voice: 'alice' }, aiResponse);
      
      // Prompt for follow-up
      twiml.say(
        { voice: 'alice' },
        'Is there anything else you would like to know?'
      );
    }
    
    // Always gather next speech input
    twiml.gather({
      input: ['speech'],
      language: 'en-US',
      speechTimeout: 'auto',
      action: process.env.NEXT_PUBLIC_BASE_URL + '/api/handle-key',
      method: 'POST'
    });
  
    return new NextResponse(twiml.toString(), {
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error) {
    console.error('Error in handle-key:', error);
    
    // Return a friendly error message in TwiML format
    const errorTwiml = new twilio.twiml.VoiceResponse();
    errorTwiml.say(
      { voice: 'alice' },
      'I apologize, but I encountered an error. Please try your question again.'
    );
    errorTwiml.gather({
      input: ['speech'],
      language: 'en-US',
      speechTimeout: 'auto',
      action: process.env.NEXT_PUBLIC_BASE_URL + '/api/handle-key',
      method: 'POST'
    });
    
    return new NextResponse(errorTwiml.toString(), {
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  }
}
