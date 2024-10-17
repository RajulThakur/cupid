import { auth } from "@/auth";
import { getUserByEmail, getUserById } from "@/lib/data-service";
import { connectToDatabase } from "@/lib/database";
import Direct from "../../../_components/Direct";

export default async function Page({params}) {
  await connectToDatabase();
  const session = await auth();
  const {_id,firstName,lastName,username} = await getUserByEmail(session.user.email);
  const user = await getUserById(params.userID[0]);
  const {firstName:friendFirstName,lastName:friendLastName,username:friendUsername} = user;
  return (
    <div>
      <Direct userid={_id.toString()} name={`${friendFirstName} ${friendLastName}`} to={params.userID[0]}/>
    </div>
  );
}
