import type { Context } from "@netlify/functions";
import OpenAI from 'openai';

import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async (req: Request, context: Context) => {
    if (!req.body) {
        throw new Error('Request body is missing');
    }

    const jobDescription = typeof req.body === 'object' && 'text' in req.body ? req.body.text : '';
    const prompt = `Generate a cover letter for a job with the following job description: ${jobDescription}.
    The cover letter should be in a professional tone and should be tailored to the job description.
    Keep your response concise and to the point, it should be 2-3 paragraphs of approximately 50 words each.
    Make sure to include the key skills and qualifications from the job description.
    Do not include any preamble or introduction, just start with the cover letter, although do include the salutation "Dear Hiring Manager,".
    Include the closing "Sincerely," and [your name].
    Do not hallucinate and do not make up any information.
    `;
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
