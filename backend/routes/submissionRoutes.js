import express from 'express';
import {
  handlecreateSubmission,
  handlegetMySubmissions
} from '../controllers/submissionController.js';

import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

/* =========================
   CREATE SUBMISSION
========================= */
router.post(
  '/',
  authenticate,
  async (req, res, next) => {
    try {
      await handlecreateSubmission(req, res);
    } catch (error) {
      next(error);
    }
  }
);

/* =========================
   GET MY SUBMISSIONS
========================= */
router.get(
  '/me',
  authenticate,
  async (req, res, next) => {
    try {
      await handlegetMySubmissions(req, res);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  '/:id',
  authenticate,
  async (req, res, next) => {
    try {
      const submissionId = Number(req.params.id);

      const submission = await prisma.submissions.findUnique({
        where: { id: submissionId },
        include: {
          quizzes: true,
          answers: {
            include: {
              questions: true,
              options: true
            }
          }
        }
      });

      if (!submission) {
        return res.status(404).json({ error: 'Result not found' });
      }

      if (submission.user_id !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      res.json({ success: true, data: submission });
    } catch (err) {
      next(err);
    }
  }
);


export default router;
