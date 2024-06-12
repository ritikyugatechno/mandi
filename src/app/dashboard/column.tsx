"use client";

import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { updataData } from "./dataSlice";

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
  sellerName: string;
  customerValue: string;
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
    cell(props) {
      const handleChange = (newValue: React.SetStateAction<string>) => {
      };
      return (
        <input
          type="text"
          value={props.getValue()}
          onChange={(e) => handleChange(e.target.value)}
        />
      );
    },
  },
  {
    accessorKey: "supplierName",
    header: "Supplier Name",
    cell: ({ row, column }) => {
      const datas = useSelector((state: RootState) => state.datas)
      const thisValue = datas[row.index].supplierName
      const dispatch = useDispatch()
      const onChangeHandle = (e) => {
        const newArray = {
          row: row.index,
          column: "supplierName",
          value: e.target.value,
        }
        dispatch(updataData(newArray))
      }
      return (
        <Input defaultValue={thisValue} onChange={onChangeHandle} />
      );
    },
  },
  {
    accessorKey: "farmerName",
    header: "Farmer Name",
  },
  {
    accessorKey: "itemName",
    header: "Item Name",
  },
  {
    accessorKey: "cnug",
    header: "C.Nug",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "typeItem",
    header: "Type Item",
  },
  {
    accessorKey: "vclNo",
    header: "VCL No",
  },
  {
    accessorKey: "freightRate",
    header: "Freight Rate",
  },
  {
    accessorKey: "otherCharge",
    header: "Other Charge",
  },
  {
    accessorKey: "labourRate",
    header: "Labour Rate",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "avgWeight",
    header: "Avg Weight",
  },
  {
    accessorKey: "sellerName",
    header: "Seller Name",
  },
  {
    accessorKey: "customerValue",
    header: "Customer Value",
  },
  {
    accessorKey: "sNug",
    header: "S.Nug",
  },
  {
    accessorKey: "netWeight",
    header: " Net Weight",
  },
  {
    accessorKey: "grossWeight",
    header: "Gross Weight",
  },
  {
    accessorKey: "cut",
    header: "Cut",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];
