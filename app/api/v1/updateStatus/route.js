import { NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";
export async function POST(req) {
  const { userId, isOnline } = await req.json();
  const lastSeen = new Date();
  await prisma.userStatus.update({
    where: { userId },
    data: { isOnline, lastSeen }
  });
  return NextResponse.json({ message: "Status updated" });
}
