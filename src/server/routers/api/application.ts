import { z } from "zod";
import short from "short-uuid";

import { createProtectedRouter } from "@server/create-router";
import { TRPCError } from "@trpc/server";
import { generateUniqueAPIKey } from "@lib/api-keys";

export const applicationRouter = createProtectedRouter()
  //
  .query("all", {
    input: z.object({
      projectSlug: z.string().optional(),
      organizationSlug: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      let query: any = {};

      if (input.projectSlug) {
        query.where = {
          project: {
            is: {
              slug: input.projectSlug,
            },
          },
        };
      }

      if (input.organizationSlug) {
        query.where = {
          project: {
            is: {
              organization: {
                is: {
                  slug: input.organizationSlug,
                },
              },
            },
          },
        };
      }

      return await ctx.prisma.application.findMany({
        ...query,
        select: {
          uid: true,
          title: true,
          description: true,
          type: true,
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
          paid: true,
          token: true,
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
      return await ctx.prisma.application.findUnique({
        where: {
          uid: input.uid,
        },
        select: {
          uid: true,
          title: true,
          description: true,
          status: true,
          paid: true,
          token: true,
          domain: true,
          brands: true,
          countries: true,
          type: true,
          expires: true,
        },
      });
    },
  })
  .mutation("add", {
    input: z.object({
      projectSlug: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      domain: z.string(),
      brands: z.array(z.object({ id: z.number() })),
      countries: z.array(z.object({ id: z.number() })),
    }),
    async resolve({ ctx, input }) {
      const [hashedApiKey, apiKey] = generateUniqueAPIKey();

      return await ctx.prisma.application.create({
        data: {
          uid: short.uuid(),
          user: {
            connect: { id: ctx.user.id },
          },
          project: {
            connect: {
              slug: input.projectSlug,
            },
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
          paid: false,
          expires: new Date(
            "Tue Sep 21 2022 16:16:50 GMT-0400 (Eastern Daylight Time)"
          ),
          token: hashedApiKey,
        },
      });
    },
  });
