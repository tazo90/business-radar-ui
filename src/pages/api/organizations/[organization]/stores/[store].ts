import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET /api/organizations/:organization/stores/:store
  if (req.method === "GET") {
    const stores = await prisma.store.findUnique({
      where: {
        organization: {
          slug: req.query.organization,
        },
      },
      select: {
        id: true,
        brand: {
          select: {
            id: true,
            name: true,
            fullName: true,
          },
        },
        country: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        name: true,
        address: true,
        phone: true,
      },
    });

    return res.status(200).json({ stores });
  }
}
