import {
  createSubmission,
  getSubmissionsByUser
} from '../models/submissionModel.js';

export async function handlecreateSubmission(req, res) {
  try {
    console.log("=== CREATE SUBMISSION HIT ===");
    console.log("USER:", req.user);
    console.log("BODY:", req.body);

    const userId = req.user.id ?? req.user.sub;
    const quizId  = Number(req.body.quizId);

    if (!quizId) {
      return res.status(400).json({
        success: false,
        error: 'quizId is required'
      });
    }

    const submission = await createSubmission(userId, quizId);

    return res.status(201).json({
      success: true,
      data: submission
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}

export async function handlegetMySubmissions(req, res) {
  try {
    const userId = req.user.id ?? req.user.sub;
    const data = await getSubmissionsByUser(userId);

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
