import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";

import { getSession } from "@lib/auth";
import prisma from "@lib/prisma";

import * as trpc from "@trpc/server";
import { Maybe } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

type CreateContextOptions =
  | trpcNext.CreateNextContextOptions
  | GetServerSidePropsContext;

async function getUserFromSession({
  session,
  req,
}: {
  session: Maybe<Session>;
  req: CreateContextOptions["req"];
}) {
  if (!session?.user?.id) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
    },
  });

  // some hacks to make sure `username` and `email` are never inferred as `null`
  if (!user) {
    return null;
  }
  const { email, username } = user;
  if (!email) {
    return null;
  }

  return {
    ...user,
    email,
    username,
  };
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async ({ req }: CreateContextOptions) => {
  // for API-response caching see https://trpc.io/docs/caching
  const session = await getSession({ req });

  const user = await getUserFromSession({ session, req });
  return {
    prisma,
    session,
    user,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
