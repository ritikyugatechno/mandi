"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ComboboxColumnField, InputColumnField, SelectColumnField } from "./columnField";

export type saleData = {
  id: number;
  serialNo: number;
  supplierName: string;
  farmerName: string;
  itemName: string;
  cnug: number;
  customerName: string;
  typeItem: string;
  vclNo: number;
  freightRate: number;
  otherCharge: number;
  labourRate: number;
  weight: Array<number>;
  avgWeight: number;
  sellerRate: string;
  customerRate: string;
  sNug: number;
  netWeight: number;
  grossWeight: number;
  cut: number;
  date: Date;
};

export const columns: ColumnDef<saleData>[] = [
  {
    accessorKey: "serialNo",
    header: "Serial Number",
    cell: InputColumnField,
  },
  {
    accessorKey: "supplierName",
    header: "Supplier Name",
    cell: ComboboxColumnField,
  },
  {
    accessorKey: "farmerName",
    header: "Farmer Name",
    cell: ComboboxColumnField,
  },
  {
    accessorKey: "itemName",
    header: "Item Name",
    cell: ComboboxColumnField,
  },
  {
    accessorKey: "cnug",
    header: "C.Nug",
    cell: InputColumnField,

  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ComboboxColumnField,
  },
  {
    accessorKey: "typeItem",
    header: "Type Item",
    cell: SelectColumnField,
  },
  {
    accessorKey: "vclNo",
    header: "VCL No",
    cell: ComboboxColumnField,
  },
  {
    accessorKey: "freightRate",
    header: "Freight Rate",
    cell: InputColumnField,
  },
  {
    accessorKey: "otherCharge",
    header: "Other Charge",
    cell: InputColumnField,
  },
  {
    accessorKey: "labourRate",
    header: "Labour Rate",
    cell: InputColumnField,
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: InputColumnField,
  },
  {
    accessorKey: "avgWeight",
    header: "Avg Weight",
    cell: InputColumnField,
  },
  {
    accessorKey: "sellerRate",
    header: "Seller Rate",
    cell: InputColumnField,
  },
  {
    accessorKey: "customerRate",
    header: "Customer Rate",
    cell: InputColumnField,
  },
  {
    accessorKey: "sNug",
    header: "S.Nug",
    cell: InputColumnField,
  },
  {
    accessorKey: "netWeight",
    header: " Net Weight",
    cell: InputColumnField,
  },
  {
    accessorKey: "grossWeight",
    header: "Gross Weight",
    cell: InputColumnField,
  },
  {
    accessorKey: "cut",
    header: "Cut",
    cell: InputColumnField,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: InputColumnField,
  },
];
