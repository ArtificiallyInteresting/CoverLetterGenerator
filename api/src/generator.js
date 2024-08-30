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
    The cover letter should be in a professional tone and should be tailored to the job description.`;
        const response = yield (0, openai_1.generateResponse)(prompt);
        return response;
    });
}
