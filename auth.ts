import NextAuth from "next-auth";
import Credential from "next-auth/providers/credentials";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credential({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        const { email, password } = credentials;

        if (typeof email !== "string" || typeof password !== "string") {
          throw new Error("Required field is missing");
        }

        user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new Error("User not found.");
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
          throw new Error("Credentials is not valid");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token, trigger, session }) {
      if (trigger === "update" && session) {
        if (session?.username) {
          token.user.username = session.username;
        }
        if (session?.email) {
          token.user.email = session.email;
        }

        return token;
      }

      if (user) {
        token.user = {
          createdAt: user.createdAt,
          role: user.role,
          updatedAt: user.updatedAt,
          username: user.username,
          id: user.id || "",
          email: user.email || "",
        };
      }

      return { ...token };
    },
    async session({ token, session }) {
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  trustHost: true,
});
