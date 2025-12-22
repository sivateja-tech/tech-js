process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED PROMISE REJECTION:", err);
});


import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from 'cors';
import pool from './config/db.js';

import authroute from './routes/authRoutes.js';
import quizRoute from './routes/quizRoutes.js';
import questionRoute from './routes/questionRoutes.js';
import userRoute from './routes/userRoutes.js';
import optionRoute from './routes/optionRoutes.js';
import submissionRoute from './routes/submissionRoutes.js';
import answerRoutes from './routes/answerRoute.js';

const app = express();
const PORT = process.env.PORT;
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(express.json());

app.use('/auth', authroute);
app.use('/quiz', quizRoute);
app.use('/questions', questionRoute);
app.use('/user', userRoute);
app.use('/options', optionRoute);
app.use('/submissions', submissionRoute);
app.use('/answers', answerRoutes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
