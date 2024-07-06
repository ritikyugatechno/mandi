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

  const [totalAvgWeight, setTotalAvgWeight] = useState(0);

  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.dataReducer.datas);
  const firstAdd = useSelector(
    (state: RootState) => state.dataReducer.firstAdd
  );

  const { data, isLoading, isError } = useFetchSale(
    selectedDate,
    selectedVclNo
  );
  useEffect(() => {
    if (!isLoading && !isError && data.length > 0) {
      dispatch(addData(data));

      // Calculate the total average weight
      const initialTotalAvgWeight = 0;
      const totalWeight = data.reduce(
        (sum, item) => sum + item.avgWeight,
        initialTotalAvgWeight
      );
      setTotalAvgWeight(totalWeight);
    }
  }, [data, isLoading, isError, dispatch]);

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

  debugger;
  const filteredTableData = tableData.filter(
    (item: { date: string | number | Date; vclNo: string }) => {
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
        return item;
      }
    }
  );
  if (filtered) {
    dispatch(addNewData(filteredTableData));
  }

  const uniqueVlcNo = [...new Set(vclList)];

  return (
    <div className="container mx-auto py-10 bg-white">
      <div className=" flex w-full">
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
        <Input value={totalAvgWeight} />
        <Button className="ml-auto" onClick={formSubmit}>
          Save
        </Button>
      </div>
      <DataTable columns={columns} data={filteredTableData} />
    </div>
  );
};

export default GetDataPage;
