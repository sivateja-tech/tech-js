import express from 'express';
import {
  handlecreateQuiz,
  handlegetQuizById,
  handlegetAllQuizzes
} from '../controllers/quizController.js';

import { authenticate, authorizeRole } from '../middlewares/auth.js';

const router = express.Router();


router.post(
  '/',
  authenticate,
  authorizeRole('admin'),
  handlecreateQuiz
);

router.get('/', handlegetAllQuizzes);


router.get('/:id', handlegetQuizById);

export default router;

