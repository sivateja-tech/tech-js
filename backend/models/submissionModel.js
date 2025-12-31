import prisma from './prisma.js';

export async function createSubmission(userId, quizId, score = 0) {
  return await prisma.submissions.create({
    data: {
      user_id: userId,
      quiz_id: quizId,
      score,
    },
    include: { answers: true }, // ✅ FIXED
  });
}

export async function getSubmissionsByUser(userId) {
  return await prisma.submissions.findMany({
    where: { user_id: userId },
    include: { quizzes: true, answers: true }
  });
}
export async function updateSubmissionScore(submissionId) {
  // Count correct answers
  const correctCount = await prisma.answers.count({
    where: {
      submission_id: submissionId,
      is_correct: true
    }
  });

  // Update score
  return await prisma.submissions.update({
    where: { id: submissionId },
    data: { score: correctCount }
  });
}

