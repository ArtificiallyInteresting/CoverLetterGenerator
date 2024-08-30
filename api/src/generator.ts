import { generateResponse } from './openai';

export async function generateCoverLetter(jobDescription: string): Promise<string> {
    const prompt = `Generate a cover letter for a job with the following job description: ${jobDescription}.
    The cover letter should be in a professional tone and should be tailored to the job description.`;
    const response = await generateResponse(prompt);
    return response;
}