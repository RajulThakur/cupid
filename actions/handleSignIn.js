"use server";

import { signIn } from "@/auth";
import { signInSchema } from "@/lib/zod";

export default async function handleSignIn(formData) {
  const formEmail = formData.get("email");
  const formPassword = formData.get("password");
  const { formEmail: email, formPassword: password } =
    await signInSchema.safeParseAsync({ formEmail, formPassword });
  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    console.log(error.message);
  }
}
