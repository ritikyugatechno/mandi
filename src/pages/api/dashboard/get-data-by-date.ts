
import prisma from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await prisma.formData.findMany({

    });
    return res.status(200).json(data);
  } else if (req.method === "POST") {
    let bodyDate = req.body.date
    if(bodyDate = 'Invalid Date'){
      bodyDate = ''
    }
    const date = new Date(bodyDate);
    // const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    // const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    // const vclNo = req.body.vclNo;
    const data = await prisma.formData.findMany(
      // {
      //   where: {
      //     date: {
      //       gte: startOfDay,
      //       lte: endOfDay
      //     },
      //   }
      // }
    );
    return res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
