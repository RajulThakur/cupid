import { getUserIdByEmail } from "@/app/_lib/data-service";
import prisma from "@/app/_lib/prisma";
import { auth } from "@/auth";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const {user} = await auth();
  const { email } = user;
  const { receiver } = await req.json();
  // Fetch sender user ID based on email
  const sender = await getUserIdByEmail(email);
  // Check if the user is already in the friends array
  const isAlreadyFriend = await prisma.friends.findFirst({
    where: {
      userId: receiver,
      friends: {
        has: sender,  // Checks if `sender` is already in the `friends` array
      },
    },
  });

  if (isAlreadyFriend) {
    return NextResponse.json(
      { error: "Already request sent" },
      { status: 400 }
    );
  }

  // Push sender ID to the requests array of the receiver user
  await prisma.friends.update({
    where: { userId: receiver },
    data: {
      requests: {
        push: new ObjectId(sender).toString(),  // Adds `sender` to the `requests` array
      }
    }
  });

  return NextResponse.json(
    { message: "Request sent", status: "success",  },
    { status: 200 }
  );
}

