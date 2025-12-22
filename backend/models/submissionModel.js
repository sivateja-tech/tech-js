import prisma from './prisma.js';
export async function createSubmission(userId,quizId,score=0){
    return await prisma.submissions.create({
        data:{
            user_id:userId,
            quiz_id:quizId,
            score,
        },
        includes:{answers:true},
    })
}
export async function getSubmissionsByUser(userId){
    return await prisma.submissions.findMany({
        where:{user_id:userId},
        include:{quizzes:true,answers:true},
    })
}
export async function getSubmissionByIdQuiz(quizId){
    return await prisma.submissions.findMany({
        where:{quiz_id:quizId},
        include:{users:true,answers:true},
    })
}