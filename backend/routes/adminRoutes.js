import express from "express";
import prisma from "../models/prisma.js";
import { authenticate, authorizeRole } from "../middlewares/auth.js";

const router = express.Router();

/* =========================
   GET ALL USERS
========================= */
router.get("/users", authenticate, authorizeRole("admin"), async (req, res) => {
  const users = await prisma.users.findMany({
    select: { id: true, username: true, email: true, role: true }
  });
  res.json(users);
});

/* =========================
   GET ALL QUIZZES
========================= */
router.get("/quizzes", authenticate, authorizeRole("admin"), async (req, res) => {
  const quizzes = await prisma.quizzes.findMany({
    include: { submissions: true }
  });
  res.json(quizzes);
});

/* =========================
   GET ALL SUBMISSIONS
========================= */
router.get("/submissions", authenticate, authorizeRole("admin"), async (req, res) => {
  const submissions = await prisma.submissions.findMany({
    include: {
      users: true,
      quizzes: true
    }
  });
  res.json(submissions);
});

export default router;
