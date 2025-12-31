import {
  saveAnswer,
  getAnswersBySubmission,
  getSubmissionByIdQuiz
} from '../models/answerModel.js';
import { updateSubmissionScore } from '../models/submissionModel.js';

/* =========================
   SAVE ANSWER
========================= */
export async function handlesaveAnswer(req, res) {
  try {
    const { submissionId, questionId, selectedOptionId } = req.body;

    if (!submissionId || !questionId || !selectedOptionId) {
      return res.status(400).json({
        success: false,
        error: 'submissionId, questionId and selectedOptionId are required'
      });
    }

    const answer = await saveAnswer(
      Number(submissionId),
      Number(questionId),
      Number(selectedOptionId)
      // is_correct handled by DB trigger
    );
     await updateSubmissionScore(Number(submissionId));
    return res.status(201).json({
      success: true,
      data: answer
    });
  } catch (err) {
    console.error("SAVE ANSWER ERROR:", err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}

/* =========================
   GET ANSWERS BY SUBMISSION
========================= */
export async function handlegetAnswersBySubmission(req, res) {
  try {
    const submissionId = Number(req.params.submissionId);

    if (isNaN(submissionId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid submissionId'
      });
    }

    // IMPORTANT: this returns ARRAY
    const submissions = await getSubmissionByIdQuiz(submissionId);
    const submission = submissions?.[0];

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found'
      });
    }

    // Ownership check
    if (submission.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'You are not allowed to view these answers'
      });
    }

    const answers = await getAnswersBySubmission(submissionId);

    if (!answers || answers.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No answers found for this submission'
      });
    }

    return res.status(200).json({
      success: true,
      count: answers.length,
      data: answers
    });
  } catch (err) {
    console.error("GET ANSWERS ERROR:", err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
