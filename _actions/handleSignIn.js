'use server';
import {signInSchema} from '@/app/_lib/zod';
import {signIn} from '@/auth';
import prisma from '@/prisma/prisma';
export default async function handleSignIn(formData) {
  try {
    const {email, password} = await signInSchema.parseAsync({
      email: formData.email,
      password: formData.password,
    });
    //check if email exits in the database
    const user = await prisma.user.findUnique({
      where: {email},
      select: {isCompleted: true},
    });
    if (!user || !user.isCompleted) {
      throw new Error('User not found. Create Account');
    }
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return {response, success: true};
  } catch (error) {
    return {sucess: false, error: error.code || error.message};
  }
}
