process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED PROMISE REJECTION:", err);
  process.exit(1);
});

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import pool from './config/db.js';
import adminRoutes from "./routes/adminRoutes.js";
import authroute from './routes/authRoutes.js';
import quizRoute from './routes/quizRoutes.js';
import questionRoute from './routes/questionRoutes.js';
import userRoute from './routes/userRoutes.js';
import optionRoute from './routes/optionRoutes.js';
import submissionRoute from './routes/submissionRoutes.js';
import answerRoutes from './routes/answerRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

/* =======================
   MIDDLEWARE
======================= */
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3001',
  credentials: true
}));
app.use("/admin", adminRoutes);
app.use(express.json({ limit: '10kb' })); // prevents large payload attacks

/* =======================
   HEALTH CHECK (IMPORTANT)
======================= */
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({
      status: 'UP',
      server: 'running',
      database: 'connected'
    });
  } catch (error) {
    res.status(500).json({
      status: 'DOWN',
      database: 'not connected'
    });
  }
});

/* =======================
   ROUTES
======================= */
app.use('/auth', authroute);
app.use('/quiz', quizRoute);
app.use('/questions', questionRoute);
app.use('/user', userRoute);
app.use('/options', optionRoute);
app.use('/submissions', submissionRoute);
app.use('/answers', answerRoutes);

/* =======================
   GLOBAL ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

/* =======================
   SERVER START
======================= */
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

/* =======================
   GRACEFUL SHUTDOWN
======================= */
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated!');
  });
});
