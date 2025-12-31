import prisma from './prisma.js';

/* =========================
   ADD QUESTION WITH OPTIONS
========================= */
export async function addQuestions(quizId, questionText, options) {
  try {
    if (!options || options.length === 0) {
      throw new Error('Options are required to create a question');
    }

    return await prisma.questions.create({
      data: {
        quiz_id: quizId,
        question_text: questionText,
        options: {
          create: options
        }
      },
      include: {
        options: true
      }
    });
  } catch (error) {
    throw new Error('Failed to add question');
  }
}

/* =========================
   GET QUESTIONS BY QUIZ
========================= */
export async function getQuestionsByQuiz(quizid) {
  try {
    return await prisma.questions.findMany({
      where: { quiz_id: quizid },
      include: {
        options: true
      },
      orderBy: {
        id: 'asc'
      }
    });
  } catch (error) {
    throw new Error('Failed to fetch questions for quiz');
  }
}
