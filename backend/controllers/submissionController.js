import {
  createSubmission,
  getSubmissionsByUser
} from '../models/submissionModel.js';

export async function handlecreateSubmission(req, res) {
  try {
    const submission = await createSubmission(
      req.user.sub,
      req.body.quizId
    );
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handlegetMySubmissions(req, res) {
  try {
    const data = await getSubmissionsByUser(req.user.sub);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
