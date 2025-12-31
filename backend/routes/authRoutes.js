import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { authenticate, authorizeRole } from '../middlewares/auth.js';

const router = express.Router();

/* =========================
   AUTH ROUTES
========================= */

/* SIGNUP */
router.post('/signup', async (req, res, next) => {
  try {
    await signup(req, res);
  } catch (error) {
    next(error);
  }
});

/* LOGIN */
router.post('/login', async (req, res, next) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error);
  }
});

/* CURRENT LOGGED-IN USER */
router.get('/me', authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User profile fetched successfully',
    user: req.user
  });
});

/* ADMIN ONLY ROUTE */
router.get(
  '/admin',
  authenticate,
  authorizeRole('admin'),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Admin access granted"
    });
  }
);

export default router;
