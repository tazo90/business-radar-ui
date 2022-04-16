import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET /api/organizations
  if (req.method === "GET") {
    const organizations = await prisma.organization.findMany();

    return res.status(200).json({ organizations });
  }
}
