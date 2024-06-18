
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await prisma.formData.findMany({

    });
    return res.status(200).json(data);
  } else if (req.method === "POST") {
    const date = new Date(req.body.date);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    const vclNo = req.body.vclNo;
    const data = await prisma.formData.findMany(
      {
        where: {
          date: {
            gte: startOfDay,
            lte: endOfDay
          },
        }
      }
    );
    console.log(date, "date is date")
    console.log(data, "data by Date")
    return res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
