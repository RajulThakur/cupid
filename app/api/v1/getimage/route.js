import prisma from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    const user = await prisma.user.findUnique({
      where: { id },
      select: { profileImage: true }
    });
    
    if (!user) {
      return NextResponse.json({ status: "error", message: "Image not found" });
    }
    return NextResponse.json({ status: "success", image: user.profileImage });
  } catch (error) {
    return NextResponse.json({ status: "error", message: error.message });
  }
}
