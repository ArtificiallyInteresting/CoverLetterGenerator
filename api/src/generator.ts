import { generateResponse } from './openai';

export async function generateCoverLetter(jobDescription: string): Promise<string> {
    const prompt = `Generate a cover letter for a job with the following job description: ${jobDescription}.
    The cover letter should be in a professional tone and should be tailored to the job description.
    Keep your response concise and to the point, it should be 2-3 paragraphs of approximately 50 words each.
    Make sure to include the key skills and qualifications from the job description.
    Do not include any preamble or introduction, just start with the cover letter, although do include the salutation "Dear Hiring Manager,".
    Include the closing "Sincerely," and [your name].
    Do not hallucinate and do not make up any information.
    `;
    const response = await generateResponse(prompt);
    return response;
}