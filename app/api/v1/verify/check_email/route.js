import prisma from '@/prisma/prisma';
import {NextResponse} from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const {email} = body;
    const user = await prisma.user.findUnique({
      where: {email},
      select: {email: true, isCompleted: true},
    });
    return NextResponse.json({available: !user || !user?.isCompleted}, {status: 200});
  } catch (error) {
    console.error('Error checking email:', error);
    return NextResponse.json({available: false}, {status: 500});
  }
}
