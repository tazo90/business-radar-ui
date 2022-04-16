import { IdentityProvider } from "@prisma/client";
import NextAuth, { Session } from "next-auth";
import { Provider } from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";

import { ErrorCode, verifyPassword } from "@lib/auth";
import prisma from "@lib/prisma";

const providers: Provider[] = [
  CredentialsProvider({
    id: "credentials",
    name: "storeeye",
    type: "credentials",
    credentials: {
      email: {
        label: "Email Address",
        type: "email",
        placeholder: "john.doe@example.com",
      },
      password: {
        label: "Password",
        type: "password",
        placeholder: "Your super secure password",
      },
    },
    async authorize(credentials) {
      if (!credentials) {
        console.error("For some reason credentials are missing");
        throw new Error(ErrorCode.InternalServerError);
      }

      const user = await prisma.user.findUnique({
        where: {
          email: credentials.email.toLowerCase(),
        },
      });

      if (!user) {
        throw new Error(ErrorCode.UserNotFound);
      }

      if (user.identityProvider !== IdentityProvider.STORE_EYE) {
        throw new Error(ErrorCode.ThirdPartyIdentityProviderEnabled);
      }

      if (!user.password) {
        throw new Error(ErrorCode.UserMissingPassword);
      }

      const isCorrectPassword = await verifyPassword(
        credentials.password,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error(ErrorCode.IncorrectPassword);
      }

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
      };
    },
  }),
];

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
  },
  providers,
  callbacks: {
    async jwt({ token, user, account }) {
      const autoMergeIdentities = async () => {
        const existingUser = await prisma.user.findFirst({
          where: { email: token.email! },
        });

        if (!existingUser) {
          return token;
        }

        return {
          id: existingUser.id,
          username: existingUser.username,
          name: existingUser.name,
          email: existingUser.email,
        };
      };

      if (!user) {
        return await autoMergeIdentities();
      }

      if (account && account.type === "credentials") {
        return {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        };
      }

      return token;
    },
    async session({ session, token }) {
      const appSession: Session = {
        ...session,
        user: {
          ...session.user,
          id: token.id as number,
          name: token.name,
          username: token.username as string,
        },
      };
      return appSession;
    },
  },
});
