import {PrismaAdapter} from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
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

          if (!email || !password) throw new Error('Provide both email and password');
          const user = await prisma.user.findUnique({
            where: {email},
            select: {isCompleted: true},
          });
          if (!user) {
            throw new Error('Invalid Email or password');
          }
          if (!user.isCompleted) {
            throw new Error('User not completed');
          }
          user.image = user.profileImage;
          user.name = `${user.firstName} ${user.lastName}`;
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new Error('Invalid Email or password');
          }
          return user;
        } catch (error) {
          throw error;
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
