"use server";

import prisma from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  const { pin, id } = await req.json();
  
  await prisma.user.update({
    where: { id },
    data: { pin }
  });
  
  return NextResponse.json({ message: "Pin updated" }, { status: 200 });
}

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");
  
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      profileImage: true,
      firstName: true,
      lastName: true,
      username: true,
    }
  });
  return NextResponse.json({ user }, { status: 200 });
}
