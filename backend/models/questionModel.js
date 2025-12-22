import prisma from './prisma.js';
export async function addQuestions(quizId,questionText,options){
    return await prisma.questions.create({
        data:{
            quiz_id:quizId,
            question_text:questionText,
            options:{
                create:options,
            },
        },
        include :{options:true},
    })
}
export async function getQuestionsByQuiz(quizid){
    return await prisma.questions.findMany({
        where : {quiz_id:quizid},
        include:{options:true},
    })
}
