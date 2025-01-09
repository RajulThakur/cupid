'use server';

import {getUserIdByEmail} from '@/app/_lib/data-service';
import {auth} from '@/auth';
import prisma from '@/prisma/prisma';
import {NextResponse} from 'next/server';

export async function POST(req) {
  const session = await auth();
  const {user} = session;
  const {email} = user;
  const {sender} = await req.json();
  const receiver = await getUserIdByEmail(email);
  await prisma.friends.update({
    where: {userId: sender},
    data: {friends: {push: receiver}},
  });
  await prisma.friends.update({
    where: {userId: receiver},
    data: {friends: {push: sender}},
  });
  const receiverData = await prisma.friends.findUnique({
    where: {userId: receiver},
    select: {requests: true},
  });

  if (!receiverData) {
    throw new Error('Receiver not found in friends table');
  }

  const updatedRequests = receiverData.requests.filter((request) => request !== sender);
  const updatedFriend = await prisma.friends.update({
    where: {userId: receiver},
    data: {requests: {set: updatedRequests}},
  });
  return NextResponse.json({success: true, message: 'Request added'}, {status: 200});
}
