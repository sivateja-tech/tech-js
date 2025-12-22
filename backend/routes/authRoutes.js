import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { authenticate, authorizeRole } from '../middlewares/auth.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);


router.get('/me', authenticate, (req, res) => {
  res.json({
    message: 'Hello ' + req.user.email,
    user: req.user
  });
});


router.get(
  '/admin',
  authenticate,
  authorizeRole('admin'),
  (req, res) => {
    res.json({ secret: "admin's only" });
  }
);

export default router;

