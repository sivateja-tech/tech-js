import express from 'express';
import {
  handlecreateUser,
  handlegetUserById,
  handlegetUserByEmail,
  handlegetAllUsers
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', handlecreateUser);
router.get('/:id', handlegetUserById);
router.get('/by-email', handlegetUserByEmail);
router.get('/', handlegetAllUsers);

export default router;
