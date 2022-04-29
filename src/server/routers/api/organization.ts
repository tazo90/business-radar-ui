import { z } from "zod";

import { createProtectedRouter } from "@server/create-router";

export const organizationRouter = createProtectedRouter()
  //
  .query("get", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.organization.findUnique({
        where: {
          slug: input.slug,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          brands: {
            select: {
              id: true,
              name: true,
              fullName: true,
            },
          },
          countries: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    },
  });
