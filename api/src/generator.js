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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCoverLetter = generateCoverLetter;
const openai_1 = require("./openai");
function generateCoverLetter(jobDescription) {
    return __awaiter(this, void 0, void 0, function* () {
        const prompt = `Generate a cover letter for a job with the following job description: ${jobDescription}.
    The cover letter should be in a professional tone and should be tailored to the job description.
    Keep your response concise and to the point, it should be 2-3 paragraphs of approximately 50 words each.
    Make sure to include the key skills and qualifications from the job description.
    Do not include any preamble or introduction, just start with the cover letter, although do include the salutation "Dear Hiring Manager,".
    Include the closing "Sincerely," and [your name].
    Do not hallucinate and do not make up any information.
    `;
        const response = yield (0, openai_1.generateResponse)(prompt);
        return response;
    });
}
