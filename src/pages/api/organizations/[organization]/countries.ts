import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET /api/organizations/:organization/countries
  if (req.method === "GET") {
    const countries = await prisma.country.findMany({
      where: {
        organization: {
          slug: req.query.organization,
        },
      },
      select: {
        id: true,
        name: true,
        code: true,
      },
    });

    return res.status(200).json({ countries });
  }
}
