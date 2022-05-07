import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "@lib/auth";
import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getSession({ req });

  // if (!session) {
  //   return res.status(401).json({ message: "Not authenticated" });
  // }

  // res.status(401).json({ message: "Invalid api key" });

  if (req.query.apiKey) {
    const application = await prisma.application.findUnique({
      where: {
        apiKey: req.query.apiKey,
      },
      select: {
        id: true,
      },
    });

    if (!application) {
      res.status(401).json({ message: "Invalid api key" });
    }
  }

  // GET /api/organizations/:organization/stores
  if (req.method === "GET") {
    const stores = await prisma.store.findMany({
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
        slug: true,
        lat: true,
        lng: true,
        address: true,
        phone: true,
      },
    });

    return res.status(200).json({ stores });
  }
}
