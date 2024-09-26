import bcrypt from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import UserModel from "./models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password)
          throw new CredentialsSignin("Enter email and password");
        // const user = await UserModel.findOne({ email }).select("+password");

        // if (!user) throw new CredentialsSignin("Incorrect email or password");
        //comparing the password
        // const compare = await bcrypt.compare(password, user.password);

        // if (!compare)
        //   throw new CredentialsSignin("Incorrect email or password");
        return {email,password}
      },
    }),

  ],
  pages:{
    signIn:'/signup'
  }
});
