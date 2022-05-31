import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET /api/organizations/:organization/stores/:store/jobs
  if (req.method === "GET") {
    console.log("REQ", req.query.store);
    const jobs = await prisma.job.findMany({
      where: {
        store: {
          is: { id: parseInt(req.query.store) },
        },
        // id: parseInt(req.query.job),
        // organization: {
        //   slug: req.query.organization,
        // },
      },
      select: {
        id: true,
        title: true,
        bannerUrl: true,
        body: true,
        footer: true,
        applyUrl: true,
        store: {
          select: {
            id: true,
            name: true,
            address: true,
            phone: true,
            brand: {
              select: {
                name: true,
                fullName: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json(jobs);
  }
}
