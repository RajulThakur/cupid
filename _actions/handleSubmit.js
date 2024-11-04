"use server";
import { redirect } from "next/navigation";
import handleSignIn from "../_actions/handleSignIn";

async function handleSubmit(formData) {
    
  const res = await handleSignIn(formData);
  if (res?.response) {
    redirect("/direct/menu/inbox");
  }
}

export default handleSubmit;
