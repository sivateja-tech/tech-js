import prisma from './prisma.js';

/* =========================
   CREATE USER
========================= */
export async function createUser(data) {
  try {
    return await prisma.users.create({
      data,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        created_at: true
      }
    });
  } catch (error) {
    throw new Error('Failed to create user');
  }
}

/* =========================
   GET USER BY ID
========================= */
export async function getUserById(id) {
  try {
    return await prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        created_at: true
      }
    });
  } catch (error) {
    throw new Error('Failed to fetch user by id');
  }
}

/* =========================
   GET USER BY EMAIL
========================= */
export async function getUserByEmail(email) {
  try {
    return await prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        hased_password: true
      }
    });
  } catch (error) {
    throw new Error('Failed to fetch user by email');
  }
}

/* =========================
   GET ALL USERS
========================= */
export async function getAllUsers() {
  try {
    return await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        created_at: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
}
