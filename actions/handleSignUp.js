"use server";

import getUserByEmail from "@/_actions/FindUserByEmail";
import { createUser } from "@/lib/data-service";
import { signInSchema } from "@/lib/zod";
import bcrypt from "bcryptjs";

export default async function handleSignUp(formData) {
  try {
    const formEmail = formData.get("Email");
    const formPassword = formData.get("password");
    const { formEmail: email, formPassword: password } =
      await signInSchema.parseAsync({ formEmail, formPassword });
    const hashPass = await bcrypt.hash(password, 7);
    await createUser({ email, password: hashPass });
    const {_id}= await getUserByEmail(email);
    return _id;
  } catch (error) {
    console.log(error.message);
  }
}
