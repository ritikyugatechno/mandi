import prisma from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const datas = req.body.datas;
    const deleteData = req.body.delete;
    datas.map(async (data: any) => {

      const weightArray = data.weight.split('+').map(Number)
      const grossWeight = weightArray.reduce((accumulator: number, currentValue: string) => accumulator + parseFloat(currentValue), 0);
      const netWeight = grossWeight - (parseFloat(data.cNug) * parseFloat(data.cut));
      const avgWeight = (netWeight / parseFloat(data.cNug)) * parseFloat(data.sNug);
      const basicAmount = netWeight * parseFloat(data.customerRate);
      const bikariAmount = avgWeight * parseFloat(data.supplierRate);
      let freightTotal = parseFloat(data.freightRate) * parseFloat(data.sNug);
      if (data.freightKg) {
        freightTotal = parseFloat(data.freightRate) * parseFloat(grossWeight);
      }
      let labourTotal = parseFloat(data.labourRate) * parseFloat(data.sNug);
      if (data.labourKg) {
        freightTotal = parseFloat(data.labourRate) * parseFloat(grossWeight);
      }
      let otherChargeTotal = (bikariAmount / 100) * data.otherCharge;
      let cut = 0;
      if (data.typeItem == 'box') {
        cut = 1.25;
      } else if (data.typeItem == 'daba') {
        cut = 0.5;
        freightTotal *= 0.4;
        labourTotal *= 0.4;
      } else if (data.typeItem == 'peti') {
        cut = 3;
      } else if (data.typeItem == 'plate') {
        cut = 0.25;
        freightTotal *= 0.5;
        labourTotal *= 0.5;
      }
      else if (data.typeItem == 'charat1') {
        cut = 1;
      }
      else if (data.typeItem == 'charat2') {
        cut = 2;
      }
      else if (data.typeItem == 'charat3') {
        cut = 1.5;
      }
      else if (data.typeItem == 'charat4') {
        cut = 0.75;
      }
      const updateData = await prisma.formData.update({
        where: { id: data.id },
        data: {
          serialNo: parseInt(data.serialNo),
          supplierName: data.supplierName,
          farmerName: data.farmerName,
          lot: data.lot,
          typeItem: data.typeItem,
          cNug: parseInt(data.cNug),
          sNug: parseInt(data.sNug),
          customerName: data.customerName,
          supplierRate: parseFloat(data.supplierRate),
          customerRate: parseFloat(data.customerRate),
          itemName: data.itemName,
          date: new Date(data.date),
          vclNo: data.vclNo,
          freightRate: parseFloat(data.freightRate),
          otherCharge: parseFloat(data.otherCharge),
          labourRate: parseFloat(data.labourRate),
          cut,
          basicAmount,
          bikariAmount,
          avgWeight,
          grossWeight,
          netWeight,
          weight: data.weight,
          freightTotal,
          labourTotal,
          otherChargeTotal,
        }
      })
      if (!updateData) {
        throw new Error('Error while updating data')
      }
    })
    deleteData.map(async (id: number) => {
      const deleteData = await prisma.formData.delete({
        where: { id }
      })
      if (!deleteData) {
        throw new Error('Error while deleting data')
      }
    })
    return res.status(200).json({ success: true });
  }
  else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

