import prisma from '@/prisma/prisma';
import {NextResponse} from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const {username} = body;
    const user = await prisma.user.findUnique({
      where: {username},
      select: {username: true, isCompleted: true},
    });

    return NextResponse.json({available: !user || !user?.isCompleted}, {status: 200});
  } catch (error) {
    console.error('Error checking username:', error);
    return NextResponse.json({available: false}, {status: 500});
  }
}
