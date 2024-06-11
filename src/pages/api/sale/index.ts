import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("handler");

  if (req.method === "GET") {
    const data = await prisma.formData.findMany();
    console.log("GET");
    return res.status(200).json(data);
  } else if (req.method === "POST") {
    console.log("POST");
    const data = req.body;
    console.log(data);
    const newFormData = await prisma.formData.create({ data: data });
    res.status(200).json({ body: "data received" });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
