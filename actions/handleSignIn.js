"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

export default async function handleSignIn(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    await signIn(
      "credentials",
      {
        email,
        password,
      },
      { redirectTo: "/inbox/direct" },
    );
  } catch (error) {
    const errorMessage =
      error instanceof CredentialsSignin ? error.message : "An error occurred";
    return { error: errorMessage };
  }
}
