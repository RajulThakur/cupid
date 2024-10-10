import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./lib/database";
import UserModel from "./models/User";
import { signInSchema } from "./lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync({
          email: credentials.email,
          password: credentials.password,
        });

        if (!email || !password)
          throw new CredentialsSignin({
            cause: "Provide both email and password",
          });
        //connection to db
        await connectToDatabase();
        const { password: userPassword, ...user } = await UserModel.findOne({
          email,
        }).select("+password");
        const { _doc: userDetails } = user;
        if (!user) throw new CredentialsSignin("Invalid Email or password");
        const compare = await bcrypt.compare(password, userPassword);

        if (!compare) throw new CredentialsSignin("Invalid Email or password");
        else return userDetails;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
