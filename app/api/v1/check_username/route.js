import prisma from '@/prisma/prisma';
import {NextResponse} from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const {username} = body;
    const user = await prisma.user.findUnique({
      where: {username},
    });

    return NextResponse.json({available: !user}, {status: 200});
  } catch (error) {
    console.error('Error checking username:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}
