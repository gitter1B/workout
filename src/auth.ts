import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "@/features/users/lib/data";
import { signInSchema } from "./lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.sub as string;
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        const { username, password } = await signInSchema.parseAsync(
          credentials
        );

        user = await getUserFromDb(username, password);

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        return {
          id: user.id.toString(),
          name: user.name,
          username: user.username,
        };
      },
    }),
  ],
});
