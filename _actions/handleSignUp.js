"use server";

import prisma from "@/app/_lib/prisma";
import { signUpSchema } from "@/app/_lib/zod";
import bcrypt from "bcryptjs";

export default async function handleSignUp(formData) {
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
      select: {
        id: true,
      },
    });
    console.log("newUser", newUser);
    const friendsRecord = await prisma.friends.create({
      data: {
        user: {
          connect: { id: newUser.id },  
        },
        friends: [],
        requests: [],
      },
    });
    console.log("friendsRecord", friendsRecord);
    return newUser.id;
  } catch (error) {
    if (error.name === "ZodError") {
      return "Validation failed. Please check your inputs.";
    }
    if (error.code === "P2002") {
      return "This email is already registered.";
    }
    return "An error occurred during sign up.";
  } finally {
    await prisma.$disconnect();
  }
}
