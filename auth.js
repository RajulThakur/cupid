import {PrismaAdapter} from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import NextAuth, {CredentialsSignin} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './prisma/prisma';
import {signInSchema} from './app/_lib/zod';

export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {label: 'Email', type: 'text'},
        password: {label: 'Password', type: 'password'},
      },
      authorize: async (credentials) => {
        try {
          const {email, password} = await signInSchema.parseAsync({
            email: credentials.email,
            password: credentials.password,
          });

          if (!email || !password)
            throw new CredentialsSignin({
              cause: 'Provide both email and password',
            });

          const user = await prisma.user.findUnique({
            where: {email, isCompleted: true},

          });
          user.image = user.profileImage;
          user.name = `${user.firstName} ${user.lastName}`;
          if (!user) {
            throw new CredentialsSignin('Invalid Email or password');
          }
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new CredentialsSignin('Invalid Email or password');
          }
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Enable JWT strategy
  },
  pages: {
    signIn: '/login',
  },
});
