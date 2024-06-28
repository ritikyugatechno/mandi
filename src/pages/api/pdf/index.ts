import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = await prisma.formData.findMany({
        
    });
    return res.status(200).json(data)
  }

  return res.status(200).json({ success: true });
}
