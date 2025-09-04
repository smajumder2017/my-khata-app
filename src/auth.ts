import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthService } from "./lib/services";
import { JWT } from "next-auth/jwt";
import {Role, BusinessUser} from "@prisma/client";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string;
    email: string;
    roleId: string;
    role: Role;
    businesses: BusinessUser[]
  }
}

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string;
    email: string;
    roleId: string;
    role: Role;
    businesses: BusinessUser[]
  }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  // interface Account {}

  interface Session {
    user: User & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/register"
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const authService = new AuthService();
        const user = await authService.login(
          credentials.email as string,
          credentials.password as string
        );
        return user;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },

    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.roleId = user.roleId;
        token.role = user.role;
        token.businesses = user.businesses
      }
      return token;
    },

    session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          roleId: token.roleId,
          role: token.role,
          businesses: token.businesses
        },
      };
    },
  },
});
