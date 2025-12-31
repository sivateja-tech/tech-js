import prisma from './prisma.js';

/* =========================
   SAVE ANSWER
========================= */
export async function saveAnswer(
  submissionId,
  questionId,
  selectedOptionId
) {
  return await prisma.answers.create({
    data: {
      submission_id: submissionId,
      question_id: questionId,
      selected_option_id: selectedOptionId
      // is_correct is handled by DB trigger
    }
  });
}

/* =========================
   GET ANSWERS BY SUBMISSION
========================= */
export async function getAnswersBySubmission(submissionId) {
  return await prisma.answers.findMany({
    where: { submission_id: submissionId },
    include: {
      questions: true,
      options: true
    }
  });
}

/* =========================
   GET SUBMISSION BY ID
========================= */
export async function getSubmissionByIdQuiz(submissionId) {
  return await prisma.submissions.findMany({
    where: { id: submissionId }
  });
}
