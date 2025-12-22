import { createQuiz, getQuizById, getAllQuizzes } from '../models/quizModel.js';

export async function handlecreateQuiz(req, res) {
  try {
    const quiz = await createQuiz(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handlegetQuizById(req, res) {
  try {
    const quiz = await getQuizById(Number(req.params.id));
    if (!quiz) return res.status(404).json({ error: "page not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handlegetAllQuizzes(req, res) {
  try {
    const quiz = await getAllQuizzes();
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
