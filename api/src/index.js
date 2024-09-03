"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const serverless_http_1 = __importDefault(require("serverless-http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const generator_1 = require("./generator");
const app = (0, express_1.default)();
const port = 3000;
// app.use(cors({
//   origin: 'http://localhost:5173', // Replace with your frontend's URL
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // Add this line to parse JSON request bodies
app.use((0, morgan_1.default)('dev')); // Add this line for logging
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms'));
app.post('/api/upload', (req, res) => {
    console.log(req.body);
    const { text } = req.body;
    (0, generator_1.generateCoverLetter)(text).then((response) => {
        console.log(response);
        res.json({ result: response });
    }).catch((error) => {
        console.error('Error in /api/upload:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Export the serverless handler
exports.handler = (0, serverless_http_1.default)(app);
// Keep the local server setup for development
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}
