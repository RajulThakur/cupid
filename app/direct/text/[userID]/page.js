import { auth } from "@/auth";
import prisma from "@/app/_lib/prisma";
import Direct from "../../../_components/Direct";
export const metadata = {
  title: "Text",
  description: "Text messages",
};
export default async function Page(props) {
  const params = await props.params;
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, username: true }
  });

  const friend = await prisma.user.findUnique({
    where: { id: params.userID },
    select: {
      firstName: true,
      lastName: true,
      username: true
    }
  });
  await prisma.userStatus.update({
    where: { userId: user.id },
    data: { isOnline: true }
  });
  return (
    <div>
      <Direct
        data={{
          userid: user.id,
          myusername: user.username,
          friendusername: friend.username,
          name: `${friend.firstName} ${friend.lastName}`,
          to: params.userID,
        }}
      />
    </div>
  );
}
