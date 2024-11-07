import { auth } from "@/auth";
import prisma from "@/app/_lib/prisma";
import { NextResponse } from "next/server";
import { getUserIdByEmail } from "@/app/_lib/data-service";

export async function GET(req) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email } = session.user;

  const user = await getUserIdByEmail(email);

  const friends = await prisma.friends.findUnique({
    where: { userId: user },
    select: {
      friends: true,
    }
  });
  if (!friends || !friends?.friends) {
    return NextResponse.json({ friends: [] });
  }

  const friendUsers = await prisma.user.findMany({
    where: {
      id: {
        in: friends.friends
      }
    },
    select: {
      username: true,
      firstName: true,
      lastName: true,
      profileImage: true,
      id: true,
      userStatus: {
        select: {
          isOnline: true,
          lastSeen: true
        }
      }
    }
  });
  console.log(friendUsers);
  return NextResponse.json({ friends: friendUsers });
}
