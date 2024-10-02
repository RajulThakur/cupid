import { auth } from "@/auth";

export default async function Home() {
  const  email  = await auth();
  console.log(email);
  return <div className=""></div>;
}
