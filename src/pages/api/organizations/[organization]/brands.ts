import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET /api/organizations/:organization/brands
  if (req.method === "GET") {
    const brands = await prisma.brand.findMany({
      where: {
        organization: {
          slug: req.query.organization,
        },
      },
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        name: true,
        fullName: true,
      },
    });

    return res.status(200).json({ brands });
  }
}
