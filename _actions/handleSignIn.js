'use server';
import {signIn} from '@/auth';
import {CredentialsSignin} from 'next-auth';

export default async function handleSignIn(formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  try {
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return {response};
  } catch (error) {
    const errorMessage = error instanceof CredentialsSignin ? error.message : 'An error occurred';
    return {error: errorMessage};
  }
}
