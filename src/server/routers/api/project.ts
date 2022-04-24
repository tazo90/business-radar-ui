import { z } from "zod";

import { createProtectedRouter, createRouter } from "@server/create-router";

// export const projectRouter = createProtectedRouter()
export const projectRouter = createRouter()
  //
  .query("list", {
    async resolve({ ctx }) {
      return await ctx.prisma.project.findMany({
        where: {
          slug: "cts",
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
