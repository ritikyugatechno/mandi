import prisma from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const lastEntry = await prisma.formData.findFirst(
      {
        orderBy: {
          id: 'desc'
        }
      }
    )
    return res.status(200).json(lastEntry);
  }
  else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
