import { z } from "zod";
import short from "short-uuid";

import { createProtectedRouter } from "@server/create-router";
import { TRPCError } from "@trpc/server";
import { generateUniqueAPIKey } from "@lib/api-keys";
import { ApplicationType } from "@prisma/client";

const translator = short();

export const consumerRouter = createProtectedRouter()
  //
  .query("all", {
    input: z.object({
      appType: z.nativeEnum(ApplicationType),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.applicationConsumer.findMany({
        where: {
          application: {
            is: { type: input.appType }
          },
        },
        select: {
          id: true,
          uid: true,
          title: true,
          description: true,
          project: {
            select: {
              name: true,
            },
          },
          brands: {
            select: {
              id: true,
              name: true,
            },
          },
          countries: {
            select: {
              id: true,
              code: true,
            },
          },
          status: true,
          apiKey: true,
          domain: true,
        },
      });
    },
  })
  .query("get", {
    input: z.object({
      uid: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.applicationConsumer.findUnique({
        where: {
          uid: input.uid,
        },
        select: {
          uid: true,
          title: true,
          description: true,
          status: true,
          apiKey: true,
          domain: true,
          brands: true,
          countries: true,
          expires: true,
        },
      });
    },
  })
  .mutation("add", {
    input: z.object({
      application: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      domain: z.string(),
      brands: z.array(z.object({ id: z.number() })),
      countries: z.array(z.object({ id: z.number() })),
      projectId: z.number(),
    }),
    async resolve({ ctx, input }) {
      const [hashedApiKey, apiKey] = generateUniqueAPIKey();

      return await ctx.prisma.applicationConsumer.create({
        data: {
          uid: translator.new(),
          user: {
            connect: { id: ctx.user.id },
          },
          project: {
            connect: { id: input.projectId },
          },
          title: input.title,
          description: input.description,
          brands: {
            connect: input.brands,
          },
          countries: {
            connect: input.countries,
          },
          domain: input.domain,
          expires: new Date(
            "Tue Sep 21 2022 16:16:50 GMT-0400 (Eastern Daylight Time)"
          ),
          // TODO: store hashedApiKey in db
          apiKey: apiKey,
        },
      });
    },
  });
