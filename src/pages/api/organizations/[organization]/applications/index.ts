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
      select: {
        id: true,
      },
    });

    if (!organization) throw new Error("No organization found");

    const applications = await prisma.application.findMany({
      where: {
        organizationId: organization.id,
      },
      select: {
        title: true,
        brands: {
          select: {
            name: true,
          },
        },
        countries: {
          select: {
            code: true,
          },
        },
        status: true,
        paid: true,
        token: true,
        expires: true,
        domain: true,
      },
    });

    return res.status(200).json({ applications });
  }
}
