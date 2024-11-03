import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
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
        const { userDetails, compare } = await validation(email, password);
        if (!userDetails) throw new CredentialsSignin("Invalid Email or password");
        if (!compare) throw new CredentialsSignin("Invalid Email or password");
        else return userDetails;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
