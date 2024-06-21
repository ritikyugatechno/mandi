import prisma from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { number } from "zod";

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
    let grossWeight: number = 0;
    let cut = 0;
    if(data.typeItem == 'box'){
      cut = 0.5;
    }else if(data.typeItem == 'daba'){
      cut = 1.5;
    }else if(data.typeItem == 'peti'){
      cut = 1;
    }else if(data.typeItem == 'plate'){
      cut = 3
    }

    let labourKg = false;
    if(data.labourKg === "true"){
      labourKg = true;
    }
    let freightKg = false;
    if(data.freightKg === "true"){
      freightKg = true;
    }

    data.weight.map((w:string) => {
      grossWeight = grossWeight + parseFloat(w)
    })
    const netWeight = grossWeight - (parseFloat(data.nug) * parseFloat(cut))
    const avgWeight = netWeight;
    const removeZeroWeight = data.weight.filter(e => parseInt(e) !== 0)
    const weight = removeZeroWeight.join("+")
    await prisma.formData.create(
      {
        data: {
          serialNo : parseInt(data.serialNo),
          supplierName: data.supplierName,
          farmerName: data.farmerName,
          cNug: parseInt(data.nug),
          lot: data.lot,
          sNug: parseInt(data.nug),
          customerName: data.customerName,
          itemName: data.itemName,
          typeItem: data.typeItem,
          date: new Date(data.date),
          vclNo: data.vclNo,
          freightRate: parseFloat(data.freightRate),
          otherCharge: parseFloat(data.otherCharge),
          labourRate: parseFloat(data.labourRate),
          freightKg,
          labourKg,
          weight,
          grossWeight,
          avgWeight,
          netWeight,
          cut,
        }
      }
    )
    console.log(weight)
    return res.status(200).json({ success: true });
  }
  else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
