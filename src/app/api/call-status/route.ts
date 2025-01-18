import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const callStatus = formData.get('CallStatus');
    const callSid = formData.get('CallSid');
    
    console.log(`Call ${callSid} ended with status: ${callStatus}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Status callback error:', error);
    return NextResponse.json(
      { error: 'Failed to process call status' },
      { status: 500 }
    );
  }
}
