"use client";
import { fieldType, formData, formName } from "./form/formData";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useEffect, useRef, useState } from "react";
import { submitFormData, useFetchListOfNames } from "./data/query";
import { useAppDispatch, useAppSelector } from "./data/hooks";
import { resetEntry, updateEntry } from "./data/entrySlice";
import { Label } from "@/components/ui/label";
import { addWeight, resetWeight, updataWeight } from "./data/weightSlice";
import { toast } from "sonner";

const Entry = () => {
  const entryData = useAppSelector((state) => state.entryReducer)
  const weight = useAppSelector((state) => state.weightReducer.weight)
  const weights = useAppSelector((state) => state.weightReducer)
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const [date, setDate] = React.useState<Date>();
  const setNewDate = (e: Date, fieldName: formName) => {
    setDate(e)
    dispatch(updateEntry({ name: fieldName, value: e.toString() }))
  }

  const formSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const data = { ...entryData, ...weights }
    const response = await submitFormData(data)
    if (!response.success) {
      toast.error("error while submitting form")
    }
    if (response.success) {
      toast.success('your form success submitted')
    }
    dispatch(resetEntry())
    dispatch(resetWeight())
    return
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (
        event.altKey &&
        event.key === 's'
      ) {
        if(formRef.current){
          formRef.current.submit();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const [isFocused, setIsFocused] = useState({
    supplierName: false,
    farmerName: false,
    customerName: false,
    itemName: false,
    vclNo: false,
    serialNo: false,
    nug: false,
    typeItem: false,
    date: false,
    freightRate: false,
    otherCharge: false,
    labourRate: false,
  });

  const handleFocus = (name: string) => {
    setIsFocused((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const handleAddWeight = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(addWeight());
  }

  const handleBlur = (name: string) => {
    setIsFocused((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };
  const { data, isError, isLoading, refetch } = useFetchListOfNames();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <form ref={formRef} onSubmit={formSubmit} className="flex flex-wrap p-12 gap-10 w-[1000px] m-auto justify-center" >
        {formData.map(
          (field) =>
            field.fieldType === fieldType.input ? (
              <>
                <div className="flex flex-col gap-1">
                  <Label>{field.name}</Label>
                  <Input
                    key={field.name}
                    name={field.name}
                    type={field.type}
                    className={`w-64 ${field.className}`}
                    min={0}
                    placeholder={field.placeholder}
                    autoFocus={field.autofocus}
                    value={entryData[field.name]}
                    onChange={(e) => dispatch(updateEntry({ name: field.name, value: e.target.value }))}
                    required
                  />
                </div>
              </>
            ) : field.fieldType === fieldType.commandInput ? (
              <div className="flex flex-col gap-1">
                <Label>{field.name}</Label>
                <Command
                  className="rounded-lg border shadow-md w-64 relative overflow-visible"
                >
                  <CommandInput
                    placeholder="Type a command or search..."
                    onFocus={() => handleFocus(field.name)}
                    onBlur={() => handleBlur(field.name)}
                    value={entryData[field.name]}
                    onValueChange={
                      (e) => dispatch(
                        updateEntry(
                          {
                            name: field.name,
                            value: e
                          }
                        )
                      )
                    }
                  />
                  <CommandList className={`${isFocused[field.name] ? '' : 'hidden'} absolute w-full top-10 z-10 bg-white shadow-lg border`} >
                    <CommandGroup  >
                      {data?.[field.name].slice(0, 5).map((name: string, index: number) => (
                        <CommandItem
                          key={index}
                          onSelect={(e) => {
                            dispatch(updateEntry({ name: field.name, value: e }))
                          }}
                        >
                          {name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            ) : field.fieldType === fieldType.selectInput ? (
              <div className="flex flex-col gap-1">
                <Label>{field.name}</Label>
                <Select
                  onValueChange={(value) =>
                    dispatch(updateEntry({ name: field.name, value: value }))
                  }
                  key={field.name}
                  name={field.name}
                  defaultValue="peti"
                >
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="peti">Peti</SelectItem>
                    <SelectItem value="daba">Daba</SelectItem>
                    <SelectItem value="box">Box</SelectItem>
                    <SelectItem value="plate">Plate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : field.fieldType === fieldType.datePicker ? (
              <div className="flex flex-col gap-1">
                <Label>{field.name}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(e) => { e && setNewDate(e, field.name) }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            ) : field.fieldType === fieldType.weightInput ? (
              <div className='w-full flex gap-4 justify-center' >
                <Button onClick={handleAddWeight} >Add Weigth</Button>
                <div className="w-[750px] flex flex-wrap gap-4 justify-center">
                  {weight.map((w: string, index: number) => (
                    <>
                      <Input
                        className="w-14"
                        key={index}
                        value={weight[index]}
                        type="number"
                        min={0}
                        onChange={(e) => dispatch(updataWeight({ index: index, value: e.target.value }))}
                      />
                    </>
                  ))
                  }
                </div>
              </div>
            ) : null
        )}
        <Button type="submit">Save</Button>
      </form>
    </>
  );
};

export default Entry;
