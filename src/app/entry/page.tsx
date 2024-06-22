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
import { formSubmit } from "./form/formSubmit";

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


  const doNothingEnter = (e: { key: string; preventDefault: () => void; }) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.altKey &&
        event.key === 's'
      ) {
        event.preventDefault();
        formSubmit(event, false);
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
  const allInput = Array.from(document.querySelectorAll("[data-key='tab']")) as [HTMLElement]
  allInput.forEach((input, index) => {
    input.addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        if (allInput.length > index + 1) {
          allInput[index + 1].focus();
        } else {
          allInput[0].focus();
        }
      }
    })
  })


  return (
    <>
      <form ref={formRef} onSubmit={formSubmit} className="flex flex-wrap p-12 gap-10 w-[1000px] m-auto justify-center" >
        {formData.map(
          (field) =>
            field.fieldType === fieldType.input ? (
              <>
                <div className="flex flex-col gap-1">
                  <Label>{field.name}</Label>
                  {field.autofocus
                    ? (

                      <Input
                        data-key='tab'
                        onKeyDown={doNothingEnter}
                        key={field.name}
                        name={field.name}
                        type={field.type}
                        className={`w-64 ${field.className}`}
                        placeholder={field.placeholder}
                        value={entryData[field.name]}
                        onChange={(e) => dispatch(updateEntry({ name: field.name, value: e.target.value }))}
                        required
                        data-autofocus='true'
                      />
                    ) : (
                      <Input
                        onKeyDown={doNothingEnter}
                        data-key='tab'
                        key={field.name}
                        name={field.name}
                        type={field.type}
                        className={`w-64 ${field.className}`}
                        min={0}
                        placeholder={field.placeholder}
                        value={entryData[field.name]}
                        onChange={(e) => dispatch(updateEntry({ name: field.name, value: e.target.value }))}
                        required
                      />
                    )
                  }
                </div>
              </>
            ) : field.fieldType === fieldType.commandInput ? (
              <div className="flex flex-col gap-1">
                <Label>{field.name}</Label>
                <Command
                  className="rounded-lg border shadow-md w-64 relative overflow-visible"
                >
                  <CommandInput
                    data-key='tab'
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
                      {data?.[field.name]?.slice(0, 5)?.map((name: string, index: number) => (
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
                  value={entryData[field.name]}
                >
                  <SelectTrigger
                    data-key='tab'
                    className="w-64">
                    <SelectValue
                      placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="peti">Peti</SelectItem>
                    <SelectItem value="daba">Daba</SelectItem>
                    <SelectItem value="box">Box</SelectItem>
                    <SelectItem value="plate">Plate</SelectItem>
                    <SelectItem value="charat1">Charat1</SelectItem>
                    <SelectItem value="charat2">Charat2</SelectItem>
                    <SelectItem value="charat3">Charat3</SelectItem>
                    <SelectItem value="charat4">Charat3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : field.fieldType === fieldType.datePicker ? (
              <div className="flex flex-col gap-1">
                <Label>{field.name}</Label>
                <Popover>
                  <PopoverTrigger
                    data-key='tab'
                    onKeyDown={doNothingEnter}
                    asChild>
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
                <div className="w-[750px] flex flex-wrap gap-4 justify-center">
                  {weight.map((w: string, index: number) => (
                    <>
                      <Input
                        onKeyDown={doNothingEnter}
                        className="w-32"
                        key={index}
                        data-key='tab'
                        value={weight[index]}
                        type="number"
                        min={0}
                        onChange={(e) => dispatch(updataWeight({ index: index, value: e.target.value }))}
                      />
                    </>
                  ))
                  }
                </div>
                <Button onClick={handleAddWeight} >Add Weigth</Button>
              </div>
            ) : field.fieldType === fieldType.selectInputKg ? (
              <div className="flex flex-col gap-1">
                <Label>{field.name}</Label>
                <Select
                  onValueChange={(value) =>
                    dispatch(updateEntry({ name: field.name, value: value }))
                  }
                  key={field.name}
                  name={field.name}
                >
                  <SelectTrigger className="w-64"
                    data-key='tab'
                  >
                    <SelectValue
                      data-key='tab'
                      placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Kg</SelectItem>
                    <SelectItem value="false">Nug</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : null
        )}
        <Button
          data-key='tab'
          type="submit">Save</Button>
      </form>
    </>
  );
};

export default Entry;
