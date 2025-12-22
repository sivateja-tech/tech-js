import express from 'express';
import { handleaddQuestions, handlegetQuestionById } from '../controllers/questionController.js';
import { authenticate, authorizeRole } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticate, authorizeRole('admin'), handleaddQuestions);
router.get('/:id', handlegetQuestionById);

export default router;
