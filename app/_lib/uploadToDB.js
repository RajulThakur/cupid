"use server";

import { prisma } from "@/app/_lib/prisma";

export async function uploadToDB(fileUrl, id) {
  await prisma.user.update({
    where: { id },
    data: {
      profileImage: fileUrl,
    },
  });
}
