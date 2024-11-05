import { getUserIdByEmail } from "@/app/_lib/data-service";
import prisma from "@/app/_lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const {user} = await auth();
  const { email } = user;
  const { receiver } = await req.json();
  const sender = await getUserIdByEmail(email);
  const updatedRequests = await prisma.friends.update({
    where: { userId: receiver },
    data: {
      requests: {
        pull: sender,
      },
    },
  });
  return NextResponse.json({ message: "Request deleted", status: "success", updatedRequests }, { status: 200 });
}