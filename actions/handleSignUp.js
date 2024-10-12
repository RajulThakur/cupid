"use server";

import getUserByEmail from "@/_actions/FindUserByEmail";
import { createUser } from "@/lib/data-service";
import { signUpSchema } from "@/lib/zod";
import bcrypt from "bcryptjs";

export default async function handleSignUp(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");
    const {
      email: Email,
      password: Password,
      username: Username,
    } = await signUpSchema.parseAsync({
      email,
      password,
      username
    });
    const hashPass = await bcrypt.hash(Password, 7);
    await createUser({ email: Email, password: hashPass, username: Username });
    const { _id } = await getUserByEmail(email);
    await Friends.create({ userId: _id });
    return _id.toString();
  } catch (error) {
    return error;
  }
}
