
import prisma from './prisma.js';
export async function addOption(questionId,optionText,isCorrect=false){
    return await prisma.options.create({
        data:{ question_id:questionId,option_text:optionText,is_correct:isCorrect},
    })
}
export async function getOptionsByQuestion(questionId) {
  return await prisma.options.findMany({
    where: { question_id: questionId },
  })
}
