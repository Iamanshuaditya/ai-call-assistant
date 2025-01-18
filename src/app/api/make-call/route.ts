import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();
    
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !twilioNumber) {
      return NextResponse.json(
        { error: 'Twilio credentials not configured' },
        { status: 500 }
      );
    }

    const client = twilio(accountSid, authToken);
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Make the call with streaming enabled
    const call = await client.calls.create({
      to: phoneNumber,
      from: twilioNumber,
      url: `${baseUrl}/api/stream`,
      record: true,
      statusCallback: `${baseUrl}/api/call-status`,
      statusCallbackEvent: ['completed'],
    });

    return NextResponse.json({ 
      success: true, 
      callSid: call.sid 
    });
    
  } catch (error) {
    console.error('Call error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate call' },
      { status: 500 }
    );
  }
}
