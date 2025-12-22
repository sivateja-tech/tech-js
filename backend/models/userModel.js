import prisma from './prisma.js';
export async function createUser(data){
    return await prisma.users.create({data});
}
export async function getUserById(id){
    return await prisma.users.findUnique({where:{id}});
}
export async function getUserByEmail(email){
    return await prisma.users.findUnique({where:{email}});
}
export async function getAllUsers(){
    return await prisma.users.findMany()
}