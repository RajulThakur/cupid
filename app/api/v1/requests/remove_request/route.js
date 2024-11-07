import { getUserIdByEmail } from "@/app/_lib/data-service";
import prisma from "@/app/_lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const { user } = await auth();
  const { email } = user;
  const { receiver } = await req.json();
  const sender = await getUserIdByEmail(email);

  const friendRecord = await prisma.friends.findUnique({
    where: { userId: receiver },
    select: { requests: true },
  });

  const updatedRequests = friendRecord.requests.filter(
    (request) => request !== sender,
  );

  await prisma.friends.update({
    where: { userId: receiver },
    data: {
      requests: {
        set: updatedRequests,
      },
    },
  });
  return NextResponse.json(
    { message: "Request deleted", status: "success" },
    { status: 200 },
  );
}
