"use server";

import { PrismaClient } from '@prisma/client';

export default async function CreateUser(email, password) {
  const prisma = new PrismaClient();
  
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return user;
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
