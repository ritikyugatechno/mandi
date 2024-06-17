"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, isSameDay } from 'date-fns'; // Import isSameDay for date comparison
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useFetchSale } from './query';
import { addData } from './dataSlice';
import { RootState } from './store';
import { DataTable } from './data-table';
import { columns } from './column';
import { cn } from '@/lib/utils';

const GetDataPage = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.datas);
  const firstAdd = useSelector((state: RootState) => state.firstAdd);

  // Fetch data based on selected date
  const { data, isLoading, isError, refetch } = useFetchSale(selectedDate);

  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError} </p>;

  // Add fetched data to Redux store only if it's the first time (firstAdd is true)
  if (firstAdd) {
    dispatch(addData(data));
  }

  // Handle date selection from calendar
  const handleDateSelect = async (newDate: Date) => {
    setSelectedDate(newDate);
    setIsPopoverOpen(false);

    // Refetch data from backend based on selected date
    await refetch(newDate);
  };

  // Filter tableData based on selectedDate
  const filteredTableData = tableData.filter(item => {
    // Convert item.date to Date object for comparison
    const itemDate = new Date(item.date);
    // Compare if the itemDate is the same day as selectedDate
    return isSameDay(itemDate, selectedDate);
  });

  return (
    <div className="container mx-auto py-10">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-[280px] justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
            onClick={() => setIsPopoverOpen(true)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
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

      <DataTable columns={columns} data={filteredTableData} />
    </div>
  );
};

export default GetDataPage;

