import { z } from "zod";

import { createProtectedRouter } from "@server/create-router";
import slugify from "@lib/slugify";
import { TRPCError } from "@trpc/server";

export const projectRouter = createProtectedRouter()
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.project.findMany({
        where: {
          ownerId: ctx.user.id,
        },
        select: {
          id: true,
          slug: true,
          name: true,
          owner: {
            select: {
              username: true,
            },
          },
          _count: {
            select: {
              applications: true,
            },
          },
        },
      });
    },
  })
  .query("get", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.project.findUnique({
        where: {
          slug: input.slug,
        },
        select: {
          id: true,
          slug: true,
          name: true,
          owner: true,
          applications: {
            select: {
              id: true,
              title: true,
              description: true,
              status: true,
              paid: true,
              token: true,
              domain: true,
              brands: true,
              countries: true,
            },
          },
        },
      });
    },
  })
  .mutation("add", {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ ctx, input }) {
      const member = await ctx.prisma.membership.findFirst({
        where: {
          userId: ctx.user.id,
        },
        select: {
          organizationId: true,
        },
      });

      if (!member) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Could not find member ${ctx.user.id}`,
        });
      }

      return await ctx.prisma.project.create({
        data: {
          name: input.name,
          slug: slugify(input.name),
          ownerId: ctx.user.id,
          organizationId: member.organizationId,
        },
      });
    },
  })
  .mutation("delete", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { slug } = input;
      await ctx.prisma.project.delete({
        where: { slug },
      });
    },
  });
