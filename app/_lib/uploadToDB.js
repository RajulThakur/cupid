'use server';

import prisma from '@/prisma/prisma';

export async function uploadToDB(fileUrl, id) {
  await prisma.user.update({
    where: {id},
    data: {
      profileImage: fileUrl,
    },
  });
}
