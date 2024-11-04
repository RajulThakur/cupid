"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export default async function handleSignUp(formData) {
  const prisma = new PrismaClient();
  
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");
    const {
      email: Email,
      password: Password,
      username: Username,
    } = await signUpSchema.parseAsync({
      email,
      password,
      username,
    });
    const hashPass = await bcrypt.hash(Password, 7);
    const newUser = await prisma.user.create({
      data: {
        email: Email,
        password: hashPass,
        username: Username,
      },
    });
    await prisma.friends.create({
      data: {
        userId: newUser.id,
      },
    });
    return newUser.id.toString();
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}
