import prisma from './prisma.js';
export async function createQuiz(data){
    return await prisma.quizzes.create({
        data,
        include:{questions:true},
    })
}
export async function getQuizById(id){
    return await prisma.quizzes.findUnique({where:{id},include:{
        questions:{
            include:{options:true},
        },
    },
})
}
export async function getAllQuizzes() {
  return await prisma.quizzes.findMany({
    include: { questions: true },
  })
}

