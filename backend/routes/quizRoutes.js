import express from "express";
import {
  handleCreateQuiz,
  handlegetQuizById,
  handlegetAllQuizzes
} from "../controllers/quizController.js";

import { authenticate, authorizeRole } from "../middlewares/auth.js";
import { handleDeleteQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRole("admin"),
  handleCreateQuiz
);

router.get("/:id", handlegetQuizById);
router.get("/", handlegetAllQuizzes);
router.delete(
  "/:id",
  authenticate,
  authorizeRole("admin"),
  handleDeleteQuiz
);


export default router;
