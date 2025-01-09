import {auth} from '@/auth';
import prisma from '@/prisma/prisma';
import Direct from './_components/Direct';
export const metadata = {
  title: 'Text',
  description: 'Text messages',
};
export default async function Page({params}) {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {email: session.user.email},
    select: {id: true, username: true},
  });
  const friend = await prisma.user.findUnique({
    where: {id: params.userID},
    select: {
      firstName: true,
      lastName: true,
      username: true,
    },
  });
  await prisma.userStatus.update({
    where: {userId: user.id},
    data: {isOnline: true},
  });
  const {id: userid, username: myusername} = user;
  const to = params.userID;
  let userA = userid,
    userB = to;
  if (userid < to) {
    [userA, userB] = [userB, userA];
  }
  const messageID = `${userA}_${userB}`;
  return (
    <Direct
      data={{
        userid,
        myusername,
        messageID,
        friendusername: friend.username,
        name: `${friend.firstName} ${friend.lastName}`,
      }}
    />
  );
}
