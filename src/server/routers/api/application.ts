import { z } from "zod";

import { createProtectedRouter } from "@server/create-router";

export const applicationRouter = createProtectedRouter()
  //
  .query("all", {
    input: z.object({
      organizationSlug: z.string().optional(),
    }),
    async resolve({ ctx }) {
      let query: any = {};

      // if (input.organizationSlug) {
      //   query.where = {
      //     project: {
      //       is: {
      //         organization: {
      //           is: {
      //             slug: input.organizationSlug,
      //           },
      //         },
      //       },
      //     },
      //   };
      // }

      return await ctx.prisma.application.findMany({
        ...query,
        select: {
          id: true,
          name: true,
          ownerId: true,
          type: true,
          paid: true,
          _count: {
            select: {
              consumers: true,
            },
          },
        },
      });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.application.delete({
        where: { id: input.id },
      });
    },
  });
  