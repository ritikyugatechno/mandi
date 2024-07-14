"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, isSameDay } from "date-fns"; // Import isSameDay for date comparison
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFetchSale, useFetchVclNo } from "./query";
import { addData } from "./dataSlice";
import { RootState } from "./store";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { cn } from "@/lib/utils";
import { addNewData } from "./filterDataSlice";
import { formSubmit } from "./formSubmit";
import { Input } from "@/components/ui/input";

const GetDataPage = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedVclNo, setSelectedVclNo] = useState<string>("all");

  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.dataReducer.datas);
  const firstAdd = useSelector(
    (state: RootState) => state.dataReducer.firstAdd
  );

  const { data, isLoading, isError } = useFetchSale(
    selectedDate,
    selectedVclNo
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError} </p>;
  if (firstAdd) {
    dispatch(addData(data));
  }
  // console.log(data[0].avgWeight);

  const handleDateSelect = async (newDate: Date) => {
    setSelectedDate(newDate);
    setIsPopoverOpen(false);
  };
  const handleVclNoSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVclNo(event.target.value);
  };

  const vclList = [] as any;
  let filtered = false;
  let totalAvgWeight = 0;
  let totalNetWeight = 0;
  let totalCnug = 0;
  let totalSnug = 0;

  const filteredTableData = tableData.filter(
    (item: {
      avgWeight: any;
      netWeight: number;
      cNug: number;
      sNug: number;
      date: string | number | Date;
      vclNo: string;
    }) => {
      const itemDate = new Date(item.date);

      let isDateMatch = isSameDay(itemDate, selectedDate);

      if (isDateMatch) {
        vclList.push(item.vclNo);
      }
      let isVclNoMatch = item.vclNo === selectedVclNo ? true : false;
      if (selectedVclNo === "all") {
        isDateMatch = true;
        isVclNoMatch = true;
      }
      if (isDateMatch && isVclNoMatch) {
        filtered = true;
        // console.log(item);

        totalAvgWeight += item.avgWeight as any;
        totalNetWeight += item.netWeight;
        totalCnug += item.cNug;
        totalSnug += item.sNug;
        return item; //avgweight
      }
    }
  );
  if (filtered) {
    dispatch(addNewData(filteredTableData));
  }

  const uniqueVlcNo = [...new Set(vclList)];

  return (
    <div className="container mx-auto py-10 bg-white">
      <div className=" flex w-full items-center">
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
              onClick={() => setIsPopoverOpen(true)}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
        <select
          value={selectedVclNo}
          onChange={handleVclNoSelect}
          className="border rounded p-2"
        >
          <option value="all">All</option>
          {uniqueVlcNo.map((data: string) => (
            <option key={data} value={data}>
              {data}
            </option>
          ))}
        </select>
        <div className="flex mb-6">
          <div className="ml-4">
            <label>Total Avg Weight</label>
            <Input value={totalAvgWeight} readOnly />
          </div>
          <div className="ml-4">
            <label>Total Net Weight</label>
            <Input value={totalNetWeight} readOnly />
          </div>
          <div className="ml-4">
            <label>Total CNug</label>
            <Input value={totalCnug} readOnly />
          </div>
          <div className="ml-4 mr-2">
            <label>Total SNug</label>
            <Input value={totalSnug} readOnly />
          </div>
        </div>
        <Button className="ml-auto h" onClick={formSubmit}>
          Save
        </Button>
      </div>

      <DataTable columns={columns} data={filteredTableData} />
    </div>
  );
};

export default GetDataPage;
