import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

const apiKey = process.env.API_KEY;

// Format products for the AI system instruction
const productContext = PRODUCTS.map(p => 
  `- ${p.name} (${p.category}): ${p.price} LKR. ${p.description} ${p.badge ? `[${p.badge}]` : ''}`
).join('\n');

const systemInstruction = `
You are "RapidBot", a helpful and cool AI sales assistant for "Rapidkeys", a tech store in Sri Lanka.
Your target audience is Sri Lankan students and gamers.
Currency is LKR (Sri Lankan Rupees).

Here is our current product inventory:
${productContext}

Rules:
1. Recommend specific products from the list above when asked.
2. Keep responses concise, friendly, and energetic. 
3. If asked about shipping, say we offer "Island-wide delivery via Courier within 2-3 days".
4. If the user asks for something we don't have, suggest the closest alternative or say we'll stock it soon.
5. Use local context if appropriate (e.g., "Perfect for Campus work", "Good for gaming at cafes").
6. Do NOT invent products that are not in the list.
`;

let aiClient: GoogleGenAI | null = null;

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key is missing. Please check configuration.";
  }

  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Sorry, I didn't catch that. Could you try again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "My circuits are a bit busy right now (API Error). Try again in a moment!";
  }
};