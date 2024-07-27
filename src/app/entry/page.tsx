"use client";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { NextSelect, fieldType, formData, formName } from "./form/formData";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { formSubmit } from "./form/formSubmit";
import { addEntry, updateEntry } from "./data/entrySlice";
import { useAppDispatch, useAppSelector } from "./data/hooks";
import { useFetchListOfNames, useGetLastEntry } from "./data/query";
import { addWeight, updataWeight } from "./data/weightSlice";
import { keyDownDataSelect, keyboardShortcut } from "./keyboardShortcut";

const Entry = () => {
  const dispatch = useAppDispatch();
  const { data: FirstEntry, isLoading: isLoadingFirstEntry, isError: isErrorFirstEntry } = useGetLastEntry();
  const entryData = useAppSelector((state) => state.entryReducer)
  const weight = useAppSelector((state) => state.weightReducer.weight)
  const formRef = useRef<HTMLFormElement>(null);
  const [date, setDate] = React.useState<any>();
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
    freightKg: false,
    labourKg: false,
  });

  const { data, isError, isLoading } = useFetchListOfNames();

  useEffect(() => {
    if (!(isLoadingFirstEntry || isErrorFirstEntry)) {
      dispatch(addEntry(FirstEntry))
      // setDate(entryData['date'])
    }
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
  }, [isLoadingFirstEntry, isErrorFirstEntry]);

  const setNewDate = (e: Date, fieldName: formName) => {
    setDate(e)
    dispatch(updateEntry({ name: fieldName, value: e.toString() }))
  }

  const doNothingEnter = (e: { key: string; preventDefault: () => void; }) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

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
  if (isLoading || isLoadingFirstEntry) {
    return <div>Loading...</div>;
  }
  if (isError || isErrorFirstEntry) {
    return <div>Error loading data</div>;
  }

  keyboardShortcut()

  return (
    <>
      <form ref={formRef} onSubmit={formSubmit} className="p-6" >
        <div className="flex p-6 flex-wrap border-gray-600 bg-white border-8 gap-10 m-auto justify-center">
          {formData.map(
            (field) =>
              field.fieldType === fieldType.input ? (
                <>
                  <div key={field.name} className="flex flex-col gap-1">
                    <Label>{field.name}</Label>
                    <Input
                      data-key='tab'
                      autoFocus={field.autofocus}
                      onKeyDown={doNothingEnter}
                      key={field.name}
                      name={field.name}
                      type={field.type}
                      className={`w-fit ${field.className}`}
                      placeholder={field.placeholder}
                      value={entryData[field.name]}
                      onChange={(e) => dispatch(updateEntry({ name: field.name, value: e.target.value }))}
                      required
                      data-autofocus='true'
                      onFocus={(e) => e.target.select()}
                      data-input={field.dataKey}
                    />
                  </div>
                </>
              ) : field.fieldType === fieldType.commandInput ? (
                <div key={field.name} className="flex flex-col gap-1">
                  <Label>{field.name}</Label>
                  <Command
                    className="rounded-lg border w-fit shadow-md relative overflow-visible"
                  >
                    <CommandInput
                      data-key='tab'
                      className={`${field.className}`}
                      placeholder="Type ..."
                      onFocus={(e) => {
                        handleFocus(field.name)
                        e.target.select()
                      }}
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
                <div key={field.name} className="flex flex-col gap-1">
                  <Label>{field.name}</Label>
                  <Select
                    onValueChange={(value) => {
                      dispatch(updateEntry({ name: field.name, value: value }));

                    }
                    }
                    key={field.name}
                    name={field.name}
                    value={entryData[field.name]}
                  >
                    <SelectTrigger
                      data-key='tab'
                      data-type='type'
                      className="w-20">
                      <SelectValue
                        placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem onKeyDown={(e) => keyDownDataSelect(e)} data-item={NextSelect.typeItem} data-type='okay' value="peti">Peti</SelectItem>
                      <SelectItem onKeyDown={(e) => keyDownDataSelect(e)} data-item={NextSelect.typeItem} value="daba">Daba</SelectItem>
                      <SelectItem onKeyDown={(e) => keyDownDataSelect(e)} data-item={NextSelect.typeItem} value="box">Box</SelectItem>
                      <SelectItem onKeyDown={(e) => keyDownDataSelect(e)} data-item={NextSelect.typeItem} value="plate">Plate</SelectItem>
                      <SelectItem onKeyDown={(e) => keyDownDataSelect(e)} data-item={NextSelect.typeItem} value="charat1">Charat1</SelectItem>
                      <SelectItem onKeyDown={(e) => keyDownDataSelect(e)} data-item={NextSelect.typeItem} value="charat2">Charat2</SelectItem>
                      <SelectItem onKeyDown={(e) => keyDownDataSelect(e)} data-item={NextSelect.typeItem} value="charat3">Charat3</SelectItem>
                      <SelectItem onKeyDown={(e) => keyDownDataSelect(e)} data-item={NextSelect.typeItem} value="charat4">Charat3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : field.fieldType === fieldType.datePicker ? (
                <div key={field.name} className="flex flex-col gap-1">
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
                <div key={field.name} className='w-full flex gap-4 justify-center' >
                  <div className="w-[750px] flex flex-wrap gap-4 justify-center">
                    {weight.map((_: string, index: number) => (
                      <>
                        <Input
                          onKeyDown={doNothingEnter}
                          className="w-32"
                          key={index}
                          data-key='tab'
                          value={weight[index]}
                          type="number"
                          onChange={(e) => dispatch(updataWeight({ index: index, value: e.target.value }))}
                          onFocus={(e) => e.target.select()}
                        />
                      </>
                    ))
                    }
                  </div>
                  <Button onClick={handleAddWeight} >Add Weigth</Button>
                </div>
              ) : field.fieldType === fieldType.selectInputKg ? (
                <div key={field.name} className="flex flex-col gap-1">
                  <Label>{field.name}</Label>
                  <Select
                    onValueChange={(value) => dispatch(updateEntry({ name: field.name, value: value }))}
                    key={field.name}
                    name={field.name}
                  >
                    <SelectTrigger
                      data-key='tab'
                      className="w-20"
                    >
                      <SelectValue
                        data-key='tab'
                        placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem onKeyDown={(e) => keyDownDataSelect(e)} data-item={field.dataKey} value="true">Kg</SelectItem>
                      <SelectItem onKeyDown={(e) => keyDownDataSelect(e)} data-item={field.dataKey} value="false">Nug</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : null
          )}
          <Button
            type="submit">Save</Button>
        </div>
      </form >
    </>
  );
};

export default Entry;
