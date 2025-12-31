import prisma from './prisma.js';

/* =========================
   ADD OPTION
========================= */
export async function addOption(questionId, optionText, isCorrect = false) {
  try {
    // If marking this option as correct, ensure no other correct option exists
    if (isCorrect) {
      await prisma.options.updateMany({
        where: {
          question_id: questionId,
          is_correct: true
        },
        data: {
          is_correct: false
        }
      });
    }

    return await prisma.options.create({
      data: {
        question_id: questionId,
        option_text: optionText,
        is_correct: isCorrect
      }
    });
  } catch (error) {
    throw new Error('Failed to add option');
  }
}

/* =========================
   GET OPTIONS BY QUESTION
========================= */
export async function getOptionsByQuestion(questionId) {
  try {
    return await prisma.options.findMany({
      where: { question_id: questionId },
      orderBy: {
        id: 'asc'
      }
    });
  } catch (error) {
    throw new Error('Failed to fetch options for question');
  }
}
