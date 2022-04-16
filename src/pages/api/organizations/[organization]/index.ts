import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET /api/organizations/:organization
  if (req.method === "GET") {
    const organization = await prisma.organization.findUnique({
      where: {
        slug: req.query.organization,
      },
    });

    return res.status(200).json({ organization });
  }
}
