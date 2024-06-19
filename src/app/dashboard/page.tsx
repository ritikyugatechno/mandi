"use client";
import { useState } from "react";
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
import useKeyboardShortcut from "../useKeyboardShortcut";

const GetDataPage = () => {
  useKeyboardShortcut("Alt+1", "/entry");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedVclNo, setSelectedVclNo] = useState<string>('');
  // const [vclList, setVclList] = useState([]);

  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.datas);
  const firstAdd = useSelector((state: RootState) => state.firstAdd);

  const { data, isLoading, isError} = useFetchSale(selectedDate, selectedVclNo);
  // const {data : vclData,isLoading: vclIsLoading } = useFetchVclNo(selectedDate, selectedVclNo);
  if (isLoading) return <p>Loading...</p>;
  // if (vclIsLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError} </p>;
  if (firstAdd) {
    dispatch(addData(data));
  }


  const handleDateSelect = async (newDate: Date) => {
    setSelectedDate(newDate);
    setIsPopoverOpen(false);
  };
  const handleVclNoSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVclNo(event.target.value);
  };

  const vclList = []

  const filteredTableData = tableData.filter((item: { date: string | number | Date; vclNo: string; }) => {
    const itemDate = new Date(item.date);
    let isDateMatch = isSameDay(itemDate, selectedDate);
    if(isDateMatch ){
      vclList.push(item.vclNo)
    }
    let isVclNoMatch = item.vclNo === selectedVclNo ? true: false;
    if(selectedVclNo === "all"){
      isDateMatch = true;
      isVclNoMatch = true;
    }
    if(isDateMatch && isVclNoMatch){
      return item
    }
  });
  
  const uniqueVlcNo = [...new Set(vclList)]

  return (
    <div className="container mx-auto py-10">
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
        <option value="">Select VclNo</option>
        <option value="all">All</option>
        {/* Add your vclNo options here */}
        {uniqueVlcNo.map((data) => (
        <option value={data}>{data}</option>
        ))}
        {/* Add more options as needed */}
      </select>

      <DataTable columns={columns} data={filteredTableData} />
    </div>
  );
};

export default GetDataPage;
