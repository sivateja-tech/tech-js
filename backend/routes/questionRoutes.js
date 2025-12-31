import express from 'express';
import {
  handleaddQuestions,
  handlegetQuestionById
} from '../controllers/questionController.js';

import { authenticate, authorizeRole } from '../middlewares/auth.js';

const router = express.Router();

/* =========================
   ADD QUESTION (ADMIN ONLY)
========================= */
router.post(
  '/',
  authenticate,
  authorizeRole('admin'),
  async (req, res, next) => {
    try {
      await handleaddQuestions(req, res);
    } catch (error) {
      next(error);
    }
  }
);

/* =========================
   GET QUESTION BY ID
========================= */
router.get(
  '/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Question id is required'
        });
      }

      await handlegetQuestionById(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
