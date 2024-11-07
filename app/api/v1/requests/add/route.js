"use server";

import { auth } from "@/auth";
import { getUserIdByEmail } from "@/app/_lib/data-service";
import prisma from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await auth();
  const { user } = session;
  const { email } = user;
  const { sender } = await req.json();
  const receiver = await getUserIdByEmail(email);
  console.log(sender, receiver);
  await prisma.friends.update({
    where: { userId: sender },
    data: { friends: { push: receiver } },
  });
  await prisma.friends.update({
    where: { userId: receiver },
    data: { friends: { push: sender } },
  });
  const receiverData = await prisma.friends.findUnique({
    where: { userId: receiver },
    select: { requests: true },
  });

  if (!receiverData) {
    throw new Error("Receiver not found in friends table");
  }

  const updatedRequests = receiverData.requests.filter(
    (request) => request !== sender,
  );
  await prisma.friends.update({
    where: { userId: receiver },
    data: { requests: { set: updatedRequests } }, // Use `set` to overwrite with new array
  });
  return NextResponse.json({ message: "Request added" }, { status: 200 });
}
