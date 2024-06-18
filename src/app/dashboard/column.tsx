"use client";

import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { updataData } from "./dataSlice";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFetchSale } from "./query";

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

const handleInputChange = ({ row, column }) => {
  const datas = useSelector((state: RootState) => state.datas);
  const thisValue = datas[row.index][column.id];
  const dispatch = useDispatch();

  const onChangeHandle = (e) => {
    const newArray = {
      row: row.index,
      column: column.id,
      value: e.target.value,
    };
    dispatch(updataData(newArray));
  };

  // Combobox -------------
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(thisValue);

  const { data, isLoading, isError, refetch } = useFetchSale(new Date());
  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  // Combobox ------------

  //---------Navigation------------
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const currentElement = e.target;
      const allElements = document.querySelectorAll("[role='combobox']");
      const currentIndex = Array.from(allElements).indexOf(currentElement);
      let nextElement;
      if (e.key === "ArrowRight") {
        nextElement = allElements[currentIndex + 1];
      } else if (e.key === "ArrowLeft") {
        nextElement = allElements[currentIndex - 1];
      }
      if (nextElement) {
        nextElement.focus();
      }
      // setOpen(true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const currentElement = e.target;
      const allElements = document.querySelectorAll("[role='combobox']");
      const currentIndex = Array.from(allElements).indexOf(currentElement);
      let nextElement;
      if (e.key === "ArrowRight") {
        nextElement = allElements[currentIndex + 1];
      } else if (e.key === "ArrowLeft") {
        nextElement = allElements[currentIndex - 1];
      }
      if (nextElement) {
        nextElement.focus();
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      const currentElement = e.target;
      const currentRow = currentElement.closest("tr");
      const currentColumnIndex = Array.from(currentRow.children).indexOf(currentElement.closest("td"));
      const nextRow = currentRow.nextElementSibling;

      if (nextRow) {
        const nextColumn = nextRow.children[currentColumnIndex];
        const nextCombobox = nextColumn.querySelector("[role='combobox']");
        if (nextCombobox) {
          nextCombobox.focus();
        }
      }
    }
  };
  //---------Navigation------------

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          onKeyDown={handleKeyDown}
        >
          {value
            ? data.find((dataValue) => dataValue.value === value)?.label
            : "Select dataValue..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search framework..."
            defaultValue={thisValue}
            onChange={onChangeHandle}
          />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {data.map((dataValue) => (
                <CommandItem
                  key={dataValue.value}
                  onSelect={() => {
                    setValue(dataValue.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === dataValue.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {dataValue.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    
  );
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
    accessorKey: "sellerRate",
    header: "Seller Rate",
    cell: handleInputChange,
  },
  {
    accessorKey: "customerRate",
    header: "Customer Rate",
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
