import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI: GoogleGenerativeAI;

// Add API key validation
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not configured in environment variables');
  throw new Error('GEMINI_API_KEY is not configured in environment variables');
} else {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

const HOTEL_CONTEXT = `Context: Hotel information system providing details in Hindi (using Roman script).

Available Information:
- Room Types and Rates:
  * Luxury Room: ₹8,000 per night
  * Deluxe Suite: ₹12,000 per night
  * Presidential Suite: ₹25,000 per night

- Facilities:
  * 24/7 Room Service
  * Swimming Pool
  * Restaurant
  * Conference Facilities
  * WiFi

- Payment Methods:
  * Cards
  * UPI
  * Bank Transfer
  * Cash

Instructions:
- Provide information in simple Hindi using Roman script
- Include relevant rates when discussing rooms
- Keep responses brief and clear
- Include payment options when discussing bookings`;

export async function getHotelResponse(userInput: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.3
      }
    });
    
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{text: HOTEL_CONTEXT}],
        },
        {
          role: 'model',
          parts: [{text: "Information ready. Will provide hotel details in Hindi using Roman script."}],
        },
      ],
    });

    const result = await chat.sendMessage(userInput);
    const response = await result.response;
    const text = response.text();
    
    // Ensure response is concise
    return text.length > 150 ? text.substring(0, 150) + '...' : text;
  } catch (error) {
    console.error('Gemini API error:', error);
    return "I apologize, but I'm having trouble processing your request at the moment. Please try again later.";
  }
}
