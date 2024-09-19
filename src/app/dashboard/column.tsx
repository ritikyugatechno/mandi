"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ComboboxColumnField, DateColumnField, DeleteColumnField, InputColumnField, SelectColumnField, SelectKgColumnField } from "./columnField";

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
  freightKg:number;
  labourKg:number;
  freightTotal:number;
  labourTotal:number;
  otherChargeTotal:number;

};

export const columns: ColumnDef<saleData>[] = [
  {
    accessorKey: "serialNo",
    header: "S No",
    cell: InputColumnField,
  },
  {
    accessorKey: "vclNo",
    header: "VCL No",
    cell: ComboboxColumnField,
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
    accessorKey: "cut",
    header: "Cut",
    cell: ({ row, column }) => {
      return (
        <div className="w-fit">
          <InputColumnField row={row} column={column} />
        </div>
      )
    },
  },
  {
    accessorKey: "sNug",
    header: "S.Nug",
    cell: InputColumnField,
  },
  {
    accessorKey: "avgWeight",
    header: "Avg Weight",
    cell: InputColumnField,
  },
  {
    accessorKey: "supplierRate",
    header: "Seller Rate",
    cell: ({ row, column }) => {
      return (
        <div className="min-w-12">
          <InputColumnField row={row} column={column} />
        </div>
      )
    },
  },
  {
    accessorKey: "customerRate",
    header: "Customer Rate",
    cell: ({ row, column }) => {
      return (
        <div className="min-w-12">
          <InputColumnField row={row} column={column} />
        </div>
      )
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ComboboxColumnField,
  },
  {
    accessorKey: "cNug",
    header: "C.Nug",
    cell: InputColumnField,
  },
  {
    accessorKey: "netWeight",
    header: " Net Weight",
    cell: InputColumnField,
  },
  {
    accessorKey: "itemName",
    header: "Item Name",
    cell: ComboboxColumnField,
  },
  {
    accessorKey: "grossWeight",
    header: "Gross Weight",
    cell: ({ row, column }) => {
      return (
        <div className="min-w-12">
          <InputColumnField row={row} column={column} />
        </div>
      )
    },
  },
  {
    accessorKey: "freightRate",
    header: "Freight Rate",
    cell: ({ row, column }) => {
      return (
        <div className="min-w-12">
          <InputColumnField row={row} column={column} />
        </div>
      )
    },
  },
  {
    accessorKey: "otherCharge",
    header: "Other Charge",
    cell: ({ row, column }) => {
      return (
        <div className="min-w-12">
          <InputColumnField row={row} column={column} />
        </div>
      )
    },
  },
  {
    accessorKey: "labourRate",
    header: "Labour Rate",
    cell: ({ row, column }) => {
      return (
        <div className="min-w-12">
          <InputColumnField row={row} column={column} />
        </div>
      )
    },
  },
  {
    accessorKey: "weight",
    header: "weight",
    cell: ({ row, column }) => {
      return (
        <div className="w-96">
          <InputColumnField row={row} column={column} />
        </div>
      )
    },
  },
  {
    accessorKey: "delete",
    header: "Delete",
    cell: DeleteColumnField,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: DateColumnField,
  },
  {
    accessorKey: "typeItem",
    header: "Type Item",
    cell: SelectColumnField,
  },
  {
    accessorKey: "freightKg",
    header: "freightRate Kg",
    cell: SelectKgColumnField,
  },
  {
    accessorKey: "labourKg",
    header: "labourRate Kg",
    cell: SelectKgColumnField,
  },
  {
    accessorKey: "freightTotal",
    header: "Freight Total",
    cell: ({ row, column }) => {
      return (
        <div className="min-w-12">
          <InputColumnField row={row} column={column} />
        </div>
      )
    },
  },
  {
    accessorKey: "labourTotal",
    header: "Labour Total",
    cell: ({ row, column }) => {
      return (
        <div className="min-w-12">
          <InputColumnField row={row} column={column} />
        </div>
      )
    },
  },
  {
    accessorKey: "otherChargeTotal",
    header: "Other Charge Total",
    cell: ({ row, column }) => {
      return (
        <div className="min-w-12">
          <InputColumnField row={row} column={column} />
        </div>
      )
    },
  }
];
