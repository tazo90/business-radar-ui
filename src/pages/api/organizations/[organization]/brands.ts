import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET /api/organizations/:organization/brands
  if (req.method === "GET") {
    const { apiKey, organization } = req.query;

    const query = {
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        name: true,
        fullName: true,
      },
    }

    if (apiKey) {
      const consumer = await prisma.applicationConsumer.findUnique({
        where: { apiKey },
        select: {
          id: true,
          brands: query,
        },
      });

      if (consumer) {
        return res.status(200).json({ brands: consumer.brands });
      }
    }

    const brands = await prisma.brand.findMany({
      where: {
        organization: {
          slug: organization,
        },
      },
      ...query
    });

    return res.status(200).json({ brands });
  }
}
