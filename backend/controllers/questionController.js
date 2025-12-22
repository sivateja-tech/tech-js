import { addQuestions, getQuestionsByQuiz } from '../models/questionModel.js';

export async function handleaddQuestions(req, res) {
  try {
    const question = await addQuestions(req.body);
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handlegetQuestionById(req, res) {
  try {
    const question = await getQuestionsByQuiz(Number(req.params.id));
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
