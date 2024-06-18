import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await prisma.formData.findMany({});
    return res.status(200).json(data);
  }
  else if (req.method === "POST") {
    const data = req.body;
    await prisma.formData.create(
      {
        data: {
          serialNo : parseInt(data.serialNo),
          supplierName: data.supplierName,
          farmerName: data.farmerName,
          cNug: parseInt(data.nug),
          sNug: parseInt(data.nug),
          customerName: data.customerName,
          itemName: data.itemName,
          typeItem: data.typeItem,
          date: new Date(data.date),
          vclNo: data.vclNo,
          freightRate: parseFloat(data.freightRate),
          otherCharge: parseFloat(data.otherCharge),
          labourRate: parseFloat(data.labourRate),
        }
      }
    )
    return res.status(200).json({ success: true });
  }
  else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
