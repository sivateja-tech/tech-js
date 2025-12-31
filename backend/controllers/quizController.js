import {
  createQuiz,
  getQuizById,
  getAllQuizzes
} from '../models/quizModel.js';

/* =========================
   CREATE QUIZ
========================= */
export async function handleCreateQuiz(req, res) {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, error: "Title is required" });
    }

    const quiz = await createQuiz({
      title,
      description,
      created_by: req.user.id
    });

    return res.status(201).json({
      success: true,
      data: quiz
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}


/* =========================
   GET QUIZ BY ID
========================= */
export async function handlegetQuizById(req, res) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid quiz id'
      });
    }

    const quiz = await getQuizById(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}

/* =========================
   GET ALL QUIZZES
========================= */
export async function handlegetAllQuizzes(req, res) {
  try {
    const quizzes = await getAllQuizzes();

    return res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
export async function handleDeleteQuiz(req, res) {
  try {
    const quizId = Number(req.params.id);

    if (!quizId) {
      return res.status(400).json({ error: "Invalid quiz id" });
    }

    await prisma.quizzes.delete({
      where: { id: quizId }
    });

    return res.status(200).json({
      success: true,
      message: "Quiz deleted successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}

