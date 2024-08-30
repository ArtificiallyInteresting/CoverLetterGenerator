import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { generateCoverLetter } from './generator';
import { Request, Response } from 'express';
const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Add this line to parse JSON request bodies
app.use(morgan('dev')); // Add this line for logging

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.post('/api/upload', (req: Request, res: Response) => {
  console.log(req.body)
  const { text } = req.body
  // const processedText = text.toUpperCase() // Example processing: convert to uppercase
  const processedText = generateCoverLetter(text).then((response) => {
    console.log(response)
    res.json({ result: response })
  }).catch((error) => {
    console.error('Error in /api/upload:', error);
    res.status(500).json({ error: 'Internal server error' });
  })
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})