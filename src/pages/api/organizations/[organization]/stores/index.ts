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

  let consumer = null;

  if (req.query.apiKey) {
    consumer = await prisma.applicationConsumer.findUnique({
      where: {
        apiKey: req.query.apiKey,
      },
      select: {
        id: true,
        brands: {
          select: {
            id: true
          }
        },
        countries: {
          select: {
            id: true
          }
        }
      },
    });

    if (!consumer) {
      res.status(401).json({ message: "Invalid api key" });
    }
  }

  // GET /api/organizations/:organization/stores
  if (req.method === "GET") {

    let query: any = {
      organization: {
        slug: req.query.organization,
      },
    };

    if (consumer) {
      const brandIds = consumer.brands.map((b) => b.id);
      const countryIds = consumer.countries.map((c) => c.id);

      query = {
        ...query,
        brandId: { in: brandIds },
        countryId: { in: countryIds },
      };
    }

    const stores = await prisma.store.findMany({
      where: query,
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
