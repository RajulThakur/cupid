"use server";
import { redirect } from "next/navigation";
import handleSignIn from "./handleSignIn";

async function handleSubmit(formData) {
    
  const res = await handleSignIn(formData);
  console.log("response", res);
  if (res?.response) {
    redirect("/direct/menu/inbox");
  }
}

export default handleSubmit;
