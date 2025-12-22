import express from 'express';
import {
  handlesaveAnswer,
  handlegetAnswersBySubmission
} from '../controllers/answerController.js';

import { authenticate, authorizeRole } from '../middlewares/auth.js';

const router = express.Router();


router.post('/', authenticate, handlesaveAnswer);

router.get('/:submissionId', handlegetAnswersBySubmission);

export default router;

