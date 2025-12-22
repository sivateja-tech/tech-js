import express from 'express';
import {
  handlecreateSubmission,
  handlegetMySubmissions
} from '../controllers/submissionController.js';

import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticate, handlecreateSubmission);
router.get('/me', authenticate, handlegetMySubmissions);

export default router;

