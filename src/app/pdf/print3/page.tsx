'use client'
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import SupplierName from './supplierName';
import { useFetchPdf } from './query';
import { format, isSameDay } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';

export const Print3: React.FC = () => {
  const contentToPrint = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedVclNo, setSelectedVclNo] = useState<string>('');
  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });
  const { data, isLoading, isError, refetch } = useFetchPdf();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError} </p>;

  const vclList = []

  const handleDateSelect = async (newDate: Date) => {
    setSelectedDate(newDate);
    setIsPopoverOpen(false);
  };
  const handleVclNoSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVclNo(event.target.value);
  };
  const filteredTableData = data.filter((item: { date: string | number | Date; vclNo: string; }) => {
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
    <>
      <div className='flex'>
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
      <Button className='ml-auto mr-10' onClick={handlePrint}>
        PRINT
      </Button>
      </div>
      <div ref={contentToPrint}>
            <SupplierName data={filteredTableData} />
      </div>
    </>
  );
};

export default Print3;
