import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

declare module "next-auth" {
  interface Session {
    error?: "RefreshAccessTokenError";
    user: ExtendedUser;
  }

  interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
  }
}

import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      username: string;
      email: string;
      role: UserRole;
      createdAt: Date;
      updatedAt: Date;
    };
  }
}
