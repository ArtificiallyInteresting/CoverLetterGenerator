"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
exports.default = (req, context) => __awaiter(void 0, void 0, void 0, function* () {
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
        const completion = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });
        return completion.choices[0].message.content || 'No response generated';
    }
    catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw new Error('Failed to generate response from OpenAI');
    }
});
