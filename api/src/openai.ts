import OpenAI from 'openai';

import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content || 'No response generated';
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to generate response from OpenAI');
  }
}