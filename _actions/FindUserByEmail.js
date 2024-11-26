'use server';

import prisma from '@/prisma/prisma';

export default async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}
