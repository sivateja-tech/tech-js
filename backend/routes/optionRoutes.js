import express from 'express';
import {
  handleaddOption,
  handlegetOptionsByQuestion
} from '../controllers/optionController.js';

import { authenticate, authorizeRole } from '../middlewares/auth.js';

const router = express.Router();

router.post(
  '/',
  authenticate,
  authorizeRole('admin'),
  handleaddOption
);


router.get('/question/:id', handlegetOptionsByQuestion);

export default router;
