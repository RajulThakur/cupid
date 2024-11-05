import prisma from "@/app/_lib/prisma";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {

  const url = new URL(req.url);
  const searchParams = url.searchParams;
  let usernameA = searchParams.get("usernameA");
  let usernameB = searchParams.get("usernameB");
  let user1 = searchParams.get("user1");
  let user2 = searchParams.get("user2");

  if (usernameA < usernameB) {
    [user1, user2] = [user2, user1];
  }

  let messages = await prisma.messages.findFirst({
    where: {
      userA: user1,
      userB: user2,
    }
  });

  if (!messages) {
    messages = await prisma.messages.create({
      data: {
        userA: user1,
        userB: user2,
        messages: [],
        createdAt: new Date()
      }
    });
  }

  const data = messages.messages.slice(-10);
  return NextResponse.json({ messages: data });
}

export async function POST(req) {

  const body = await req.json();
  let { usernameA, usernameB, from, message, user1, user2, msgType } = body;

  if (usernameA < usernameB) {
    [user1, user2] = [user2, user1];
  }

  let messageDoc = await prisma.messages.findFirst({
    where: {
      userA: user1,
      userB: user2,
    }
  });

  if (!messageDoc) {
    messageDoc = await prisma.messages.create({
      data: {
        userA: user1,
        userB: user2,
        messages: [],
        createdAt: new Date()
      }
    });
  }

  await prisma.messages.update({
    where: { id: messageDoc.id },
    data: {
      messages: {
        push: {
          id: new ObjectId().toString(),
          from,
          message,
          msgType,
          createdAt: new Date()
        }
      }
    }
  });

  return NextResponse.json({ message: "Message sent" });
}
