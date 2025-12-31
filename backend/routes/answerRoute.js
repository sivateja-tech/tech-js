import express from 'express';
import {
  handlesaveAnswer,
  handlegetAnswersBySubmission
} from '../controllers/answerController.js';

import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

/* =========================
   SAVE ANSWER
   Protected Route
========================= */
router.post(
  '/',
  authenticate,
  async (req, res, next) => {
    try {
      await handlesaveAnswer(req, res);
    } catch (error) {
      next(error);
    }
  }
);

/* =========================
   GET ANSWERS BY SUBMISSION
========================= */
router.get(
  '/:submissionId',
  async (req, res, next) => {
    try {
      const { submissionId } = req.params;

      if (!submissionId) {
        return res.status(400).json({
          success: false,
          message: 'submissionId is required'
        });
      }

      await handlegetAnswersBySubmission(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
