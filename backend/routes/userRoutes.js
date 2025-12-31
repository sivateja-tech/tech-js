import express from 'express';
import {
  handlecreateUser,
  handlegetUserById,
  handlegetUserByEmail,
  handlegetAllUsers
} from '../controllers/userController.js';

const router = express.Router();

/* =========================
   CREATE USER
========================= */
router.post(
  '/',
  async (req, res, next) => {
    try {
      await handlecreateUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

/* =========================
   GET USER BY EMAIL
   (Placed before :id to avoid conflicts)
========================= */
router.get(
  '/by-email',
  async (req, res, next) => {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      await handlegetUserByEmail(req, res);
    } catch (error) {
      next(error);
    }
  }
);

/* =========================
   GET USER BY ID
========================= */
router.get(
  '/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'User id is required'
        });
      }

      await handlegetUserById(req, res);
    } catch (error) {
      next(error);
    }
  }
);

/* =========================
   GET ALL USERS
========================= */
router.get(
  '/',
  async (req, res, next) => {
    try {
      await handlegetAllUsers(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
