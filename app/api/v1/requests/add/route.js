'use server';

import {auth} from '@/auth';
import {getUserIdByEmail} from '@/app/_lib/data-service';
import prisma from '@/prisma/prisma';
import {NextResponse} from 'next/server';
import {database} from '@/app/_firebase/firebase';
import {ref, set} from 'firebase/database';

export async function POST(req) {
  const session = await auth();
  const {user} = session;
  const {email} = user;
  const {sender} = await req.json();
  const receiver = await getUserIdByEmail(email);
  console.log(sender, receiver);
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

  //Sort the users so that the bigger one is first
  let userA = sender;
  let userB = receiver;
  console.log('userA', userA, 'userB', userB);
  console.log('sender<receiver', sender < receiver);
  if (sender < receiver) {
    [userA, userB] = [userB, userA];
  }
  console.log('userA', userA, 'userB', userB);

  const megRef = ref(database, `/${userA}_${userB}`);
  await set(megRef, {
    createdAt: new Date().toISOString(),
  });

  if (!receiverData) {
    throw new Error('Receiver not found in friends table');
  }

  const updatedRequests = receiverData.requests.filter((request) => request !== sender);
  await prisma.friends.update({
    where: {userId: receiver},
    data: {requests: {set: updatedRequests}}, // Use `set` to overwrite with new array
  });
  return NextResponse.json({message: 'Request added'}, {status: 200});
}
