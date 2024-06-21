import prisma from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   if (req.method === "POST") {
    const date = req.body.date;
    const vclNo = req.body.vclNo;
    const data = await prisma.formData.findMany(
      {
        select:{
            vclNo: true
        }
      }
    );
    return res.status(200).json(data);
  }
   else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

