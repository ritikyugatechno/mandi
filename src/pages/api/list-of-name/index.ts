import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";

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
        vclNo: true,
        lot: true
      }
    });
    type FormDataKeys = 'supplierName' | 'farmerName' | 'customerName' | 'itemName' | 'vclNo' | 'lot';

    const getFilteredData = (name: FormDataKeys) => {
      const mapList = data.map(item => item[name]);
      const filteredMapList = mapList.filter((name, index) => {
        return mapList.indexOf(name) === index;
      });
      return filteredMapList
    }

    return res.status(200).json({
      'supplierName': getFilteredData('supplierName'),
      'farmerName': getFilteredData('farmerName'),
      'customerName': getFilteredData('customerName'),
      'itemName': getFilteredData('itemName'),
      'vclNo': getFilteredData('vclNo'),
      'lot': getFilteredData('lot')
    });
  }
  else if (req.method === "POST") {
    // const data = req.body;
    // const newFormData = await prisma.formData.create({ data: data });
    // return res.status(200).json(newFormData);
  }
  else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
