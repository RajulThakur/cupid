import { auth } from "@/auth";
import prisma from "@/app/_lib/prisma";
import { NextResponse } from "next/server";
import { getUserIdByEmail } from "@/app/_lib/data-service";

export async function POST(req) {
  const session = await auth();
  const { receiver } = await req.json();
  const { email } = session.user;
  const sender = await getUserIdByEmail(email);
  console.log("sender", sender);
  console.log("receiver", receiver);

  // Fetch the current friend requests
  const friendRecord = await prisma.friends.findUnique({
    where: {
      userId: sender,
    },
    select: {
      requests: true,
    },
  });

  // Remove the specific senderId from the requests
  const updatedRequests = friendRecord.requests.filter(
    (request) => request !== receiver,
  );

  // Update the friend requests in the database
  await prisma.friends.update({
    where: { userId: sender },
    data: { requests: updatedRequests },
  });

  console.log("Updated friend requests", updatedRequests);

  return NextResponse.json({ message: "Request rejected" }, { status: 200 });
}
