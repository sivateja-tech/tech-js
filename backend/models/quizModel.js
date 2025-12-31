import prisma from './prisma.js';

/* =========================
   CREATE QUIZ
========================= */
export async function createQuiz(data) {
  try {
    return await prisma.quizzes.create({
      data,
      include: {
        questions: true
      }
    });
  } catch (error) {
    throw new Error('Failed to create quiz');
  }
}

/* =========================
   GET QUIZ BY ID (FULL DETAILS)
========================= */
export async function getQuizById(id) {
  try {
    return await prisma.quizzes.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    });
  } catch (error) {
    throw new Error('Failed to fetch quiz by id');
  }
}

/* =========================
   GET ALL QUIZZES (LIST VIEW)
========================= */
export async function getAllQuizzes() {
  try {
    return await prisma.quizzes.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        created_at: true,
        questions: {
          select: {
            id: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  } catch (error) {
    throw new Error('Failed to fetch quizzes');
  }
}
