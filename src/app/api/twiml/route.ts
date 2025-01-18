import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function GET() {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();
  
  response.say(
    { voice: 'alice' },
    'Hello, I am chat assistant. How may I help you?'
  );

  return new NextResponse(response.toString(), {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
