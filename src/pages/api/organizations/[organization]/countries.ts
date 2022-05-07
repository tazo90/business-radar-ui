import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET /api/organizations/:organization/countries
  if (req.method === "GET") {
    const { apiKey, organization } = req.query;

    const query = {
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        code: true,
      },
    }

    if (apiKey) {
      const consumer = await prisma.applicationConsumer.findUnique({
        where: { apiKey },
        select: {
          id: true,
          countries: query,
        },
      });

      if (consumer) {
        return res.status(200).json({ countries: consumer.countries });
      }
    }

    const countries = await prisma.country.findMany({
      where: {
        organization: {
          slug: organization,
        },
      },
      ...query
    });

    return res.status(200).json({ countries });
  }
}
