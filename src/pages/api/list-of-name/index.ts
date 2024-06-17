import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await prisma.formData.findMany({
      select: {
        supplierName: true,
        farmerName: true,
        customerName: true,
        itemName: true,
        vclNo: true
      }
    });
    return res.status(200).json(data);
  }
  else if (req.method === "POST") {
  }
  else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
