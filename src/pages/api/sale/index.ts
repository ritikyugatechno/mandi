import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    console.log(req.query)
    const data = await prisma.formData.findMany({

    });
    return res.status(200).json(data);
  } else if (req.method === "POST") {
    const data = req.body;
    const newFormData = await prisma.formData.create({ data: data });
    res.status(200).json({ body: "data received" });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
