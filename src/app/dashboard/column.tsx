"use client";

import { ColumnDef } from "@tanstack/react-table";
import { log } from "console";
import { useState } from "react";

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
      console.log(props.row.index);
      console.log(props.row);
      console.log(props);
      const handleChange = (newValue: React.SetStateAction<string>) => {
        console.log(newValue);
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
    cell: (props) => {
      // Initialize state with the initial value from props
      const [value, setValue] = useState(props.getValue());

      // Handle the change event
      const handleChange = (newValue: string) => {
        setValue(newValue); // Update the state with the new value
        console.log(newValue); // Log the new value
      };

      return (
        <input
          type="text"
          value={value} // Controlled input value from state
          onChange={(e) => handleChange(e.target.value)} // Update state on change
        />
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
