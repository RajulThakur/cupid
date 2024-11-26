import prisma from '@/app/_lib/prisma';
import {NextResponse} from 'next/server';

export async function GET(req) {
  try {
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');

    const user = await prisma.user.findUnique({
      where: {id},
      select: {profileImage: true},
    });

    if (!user) {
      return NextResponse.json({status: 'error', message: 'Image not found'});
    }
    return NextResponse.json({status: 'success', image: user.profileImage});
  } catch (error) {
    return NextResponse.json({status: 'error', message: error.message});
  }
}
export async function UPDATE(req) {
  try {
    const {id, newImageURL} = await req.json();
    const user = await prisma.user.update({
      where: {id},
      data: {profileImage: newImageURL},
    });
  } catch (error) {
    return NextResponse.json({status: 'error', message: error.message});
  }
}
export async function DELETE(req) {
  try {
    const {id} = await req.json();
    const user = await prisma.user.update({
      where: {id},
      data: {profileImage: null},
    });
  } catch (error) {
    return NextResponse.json({status: 'error', message: error.message});
  }
}
export async function POST(req) {
  try {
    const {id, newImageURL} = await req.json();
    const user = await prisma.user.update({
      where: {id},
      data: {
        profileImage: newImageURL,
      },
    });
    return NextResponse.json({status: 'success', user});
  } catch (error) {
    return NextResponse.json({status: 'error', message: error.message});
  }
}
