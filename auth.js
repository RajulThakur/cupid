import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import getUserByEmail from "./_actions/FindUserByEmail";
import { connectToDatabase } from "./lib/database";
import UserModel from "./models/User";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password)
          throw new CredentialsSignin({
            cause: "Provide both email and password",
          });
        //connection to db
        await connectToDatabase();
        const user = await UserModel.findOne({ email });
        console.log(user)
        if (!user)
          throw new CredentialsSignin({ cause: "Invalid Email or password" });
        const compare = await bcrypt.compare(user.password, password);
        if (!compare)
          throw new CredentialsSignin({ cause: "Invalid Email or password" });
        return { email:user.email,name:user.firstName,id:user._id };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
