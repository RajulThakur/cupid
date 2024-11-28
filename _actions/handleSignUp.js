'use server';

import prisma from '@/prisma/prisma';
import {signUpSchema} from '@/app/_lib/zod';
export default async function handleSignUp(formData) {
  try {
    const {email, password, username} = formData;
    const {
      email: Email,
      password: Password,
      username: Username,
    } = await signUpSchema.parseAsync({
      email,
      password,
      username,
    });
    //cheacking if the email is already in use and if the user is completed
    const user = await prisma.user.findUnique({
      where: {email: Email},
      select: {email: true, isCompleted: true},
    });
    //check if the user is already in the database
    if (user && user.isCompleted) {
      throw new Error('Email already in use');
    }
    //check if the isCompleted is false
    if (user && !user.isCompleted) {
      const updatedUser = await prisma.user.update({
        where: {email: Email},
        data: {password: Password, username: Username},
        select: {
          id: true,
        },
      });
      return updatedUser.id;
    }
    const newUser = await prisma.user.create({
      data: {
        email: Email,
        password: Password,
        username: Username,
        isCompleted: false,
      },
      select: {
        id: true,
      },
    });
    await prisma.userStatus.create({
      data: {
        userId: newUser.id,
        isOnline: false,
        lastSeen: new Date(),
      },
    });
    await prisma.friends.create({
      data: {
        userId: newUser.id,
        friends: [],
        requests: [],
      },
    });
    return newUser.id;
  } catch (error) {
    return error;
  }
}
