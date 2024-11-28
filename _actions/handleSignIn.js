'use server';
import {signInSchema} from '@/app/_lib/zod';
import {signIn} from '@/auth';
import prisma from '@/prisma/prisma';
import {CredentialsSignin} from 'next-auth';
import {redirect} from 'next/navigation';

export default async function handleSignIn(formData) {
  console.log('Login email', formData.email);
  console.log('Login password', formData.password);
  try {
    const {email, password} = formData;
    const {email: parsedEmail, password: parsedPassword} = await signInSchema.parseAsync({
      email,
      password,
    });
    //check if email exits in the database
    const user = await prisma.user.findUnique({
      where: {email: parsedEmail},
    });
    if (!user) {
      throw new Error('User not found or not completed');
    }
    const response = await signIn('credentials', {
      email: parsedEmail,
      password: parsedPassword,
      redirect: false,
    });
    if (response?.ok) {
      redirect('/direct/menu/inbox');
    } else {
      console.log('Sign-in error:', response.error);
    }
  } catch (error) {
    throw new Error(error.cause.err);
  }
}
