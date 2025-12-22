import { saveAnswer, getAnswersBySubmission, getSubmissionByIdQuiz } from '../models/answerModel.js';

export async function handlesaveAnswer(req, res) {
  try {
    const { submissionId, questionId, selectedOptionId, isCorrect } = req.body;

    if (!submissionId || !questionId || !selectedOptionId || isCorrect === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const answer = await saveAnswer(submissionId, questionId, selectedOptionId, isCorrect);
    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handlegetAnswersBySubmission(req, res) {
  try {
    const submissionId = Number(req.params.submissionId);
    if (!submissionId) {
      return res.status(400).json({ error: "Invalid submissionId" });
    }

    const answer = await getAnswersBySubmission(submissionId);
    if (!answer || answer.length === 0) {
      return res.status(404).json({ error: "No answer found for this submission" });
    }

    const submission = await getSubmissionByIdQuiz(submissionId);
    if (!submission) {
      return res.status(404).json({ error: "No submission details" });
    }

    if (submission.userId !== req.user.id) {
      return res.status(403).json({ error: "You are not allowed to see these answers" });
    }

    res.json(answer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
