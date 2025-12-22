import prisma from './prisma.js';

// Save an answer
export async function saveAnswer(submissionId, questionId, selectedOptionId, isCorrect) {
  return await prisma.answer.create({
    data: {
      submission_id: submissionId,
      question_id: questionId,
      selected_option_id: selectedOptionId,
      is_correct: isCorrect,
    },
  });
}

// Get all answers for a submission
export async function getAnswersBySubmission(submissionId) {
  return await prisma.answer.findMany({   // should be singular "answer", not "answers"
    where: { submission_id: submissionId },
    include: { questions: true, options: true },
  });
}

// Get submission by ID (needed in answerController)
export async function getSubmissionByIdQuiz(submissionId) {
  return await prisma.submission.findUnique({
    where: { id: submissionId },
  });
}
