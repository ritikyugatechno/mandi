import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const formSchema = z.object({
  serialNo: z.string(),
  supplierName: z
    .string({ required_error: "Supplier name is required" })
    .min(1),
  farmerName: z.string({ required_error: "Farm name is required" }),
  itemName: z.string({ required_error: "Item name is required" }),
  nug: z.string({ required_error: "Nug is required" }),
  customerName: z.string({ required_error: "Customer name is required" }),
  typeItem: z.string({ required_error: "Item name is required" }),
  date: z.date({ required_error: "Date is required" }),
  vclNo: z.string({ required_error: "VclNo is required" }),
  freightRate: z.string({ required_error: "FreightRate is required" }),
  otherCharge: z.string({ required_error: "OtherCharge is required" }),
  labourRate: z.string({ required_error: "LabourRate is required" }),
  weight: z.array(z.string().optional()),
});

export const formObject = {
  resolver: zodResolver(formSchema),
  defaultValues: {
    serialNo: "",
    supplierName: "",
    farmerName: "",
    typeItem: "",
    nug: "",
    customerName: "",
    itemName: "",
    date: new Date(),
    vclNo: "",
    freightRate: "",
    otherCharge: "",
    labourRate: "",
  },
}
