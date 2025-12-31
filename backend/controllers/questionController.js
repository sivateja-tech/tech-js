import {
  addQuestions,
  getQuestionsByQuiz
} from '../models/questionModel.js';

/* =========================
   ADD QUESTIONS TO QUIZ
========================= */
export async function handleaddQuestions(req, res) {
  try {
    const { quizId, questionText, options } = req.body;

    if (!quizId || !questionText || !Array.isArray(options)) {
      return res.status(400).json({
        success: false,
        error: "quizId, questionText, options are required"
      });
    }

    const question = await addQuestions(
      quizId,
      questionText,
      options
    );

    return res.status(201).json({
      success: true,
      data: question
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}

/* =========================
   GET QUESTIONS BY QUIZ ID
========================= */
export async function handlegetQuestionById(req, res) {
  try {
    const quizId = Number(req.params.id);

    if (isNaN(quizId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid quiz id'
      });
    }

    const questions = await getQuestionsByQuiz(quizId);

    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No questions found for this quiz'
      });
    }

    return res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
