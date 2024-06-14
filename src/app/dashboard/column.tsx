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



const handleInputChange = ({ row, column }) => {
  const datas = useSelector((state: RootState) => state.datas);
  const thisValue = datas[row.index][column.id  ];
  const dispatch = useDispatch();
  const onChangeHandle = (e) => {
    const newArray = {
      row: row.index,
      column: column.id,
      value: e.target.value,
    };
    dispatch(updataData(newArray));
  };
  return <Input defaultValue={thisValue} onChange={onChangeHandle} />;
};

export const columns: ColumnDef<saleData>[] = [
  {
    accessorKey: "serialNo",
    header: "Serial Number",
    cell: handleInputChange,
  },
  {
    accessorKey: "supplierName",
    header: "Supplier Name",
    cell: handleInputChange,
  },
  {
    accessorKey: "farmerName",
    header: "Farmer Name",
    cell: handleInputChange,
  },
  {
    accessorKey: "itemName",
    header: "Item Name",
    cell: handleInputChange,
  },
  {
    accessorKey: "cnug",
    header: "C.Nug",
    cell: handleInputChange,
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: handleInputChange,
  },
  {
    accessorKey: "typeItem",
    header: "Type Item",
    cell: handleInputChange,
  },
  {
    accessorKey: "vclNo",
    header: "VCL No",
    cell: handleInputChange,
  },
  {
    accessorKey: "freightRate",
    header: "Freight Rate",
    cell: handleInputChange,
  },
  {
    accessorKey: "otherCharge",
    header: "Other Charge",
    cell: handleInputChange,
  },
  {
    accessorKey: "labourRate",
    header: "Labour Rate",
    cell: handleInputChange,
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: handleInputChange,
  },
  {
    accessorKey: "avgWeight",
    header: "Avg Weight",
    cell: handleInputChange,
  },
  {
    accessorKey: "sellerName",
    header: "Seller Name",
    cell: handleInputChange,
  },
  {
    accessorKey: "customerValue",
    header: "Customer Value",
    cell: handleInputChange,
  },
  {
    accessorKey: "sNug",
    header: "S.Nug",
    cell: handleInputChange,
  },
  {
    accessorKey: "netWeight",
    header: " Net Weight",
    cell: handleInputChange,
  },
  {
    accessorKey: "grossWeight",
    header: "Gross Weight",
    cell: handleInputChange,
  },
  {
    accessorKey: "cut",
    header: "Cut",
    cell: handleInputChange,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: handleInputChange,
  },
];
