import express from 'express';
import {
  handleaddOption,
  handlegetOptionsByQuestion
} from '../controllers/optionController.js';

import { authenticate, authorizeRole } from '../middlewares/auth.js';

const router = express.Router();

/* =========================
   ADD OPTION (ADMIN ONLY)
========================= */
router.post(
  '/',
  authenticate,
  authorizeRole('admin'),
  async (req, res, next) => {
    try {
      await handleaddOption(req, res);
    } catch (error) {
      next(error);
    }
  }
);

/* =========================
   GET OPTIONS BY QUESTION
========================= */
router.get(
  '/question/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Question id is required'
        });
      }

      await handlegetOptionsByQuestion(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
