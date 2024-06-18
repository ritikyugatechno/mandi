"use client";

import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formObject, formSchema } from "./form/formSchema";
import { fieldType, formData } from "./form/formData";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandDialog,
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
import React, { useState } from "react";
import { useFetchListOfNames } from "./data/query";
import { useAppDispatch, useAppSelector } from "./data/hooks";
import { updateEntry } from "./data/entrySlice";

const Entry = () => {
  const entryData = useAppSelector((state) => state.entryReducer);
  const weight = useAppSelector((state) => state.weightReducer.weight);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [date, setDate] = React.useState<Date>();
  const [isFocused, setIsFocused] = useState({
    supplierName: false,
    farmerName: false,
    customerName: false,
    itemName: false,
    vclNo: false,
  });

  const handleFocus = (name) => {
    setIsFocused((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const handleBlur = (name) => {
    setIsFocused((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };
  const form = useForm<z.infer<typeof formSchema>>(formObject);
  const { data, isError, isLoading, refetch } = useFetchListOfNames();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-wrap"
          onSubmit={form.handleSubmit((data) => console.log(data))}
        >
          {formData.map((field) =>
            field.fieldType === fieldType.input ? (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={() => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <Input
                      type={field.type}
                      className={`${field.className} mt-40 `}
                      placeholder={field.placeholder}
                      autoFocus={field.autofocus}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : field.fieldType === fieldType.commandInput ? (
              <Command className="rounded-lg border shadow-md w-40 relative">
                <CommandInput
                  placeholder="Type a command or search..."
                  onFocus={() => handleFocus(field.name)}
                  onBlur={() => handleBlur(field.name)}
                  value={entryData[field.name]}
                  onValueChange={(e) =>
                    dispatch(
                      updateEntry({
                        name: field.name,
                        value: e,
                      })
                    )
                  }
                />
                <CommandList
                  className={`${
                    isFocused[field.name] ? "" : "hidden"
                  } absolute `}
                >
                  <CommandGroup>
                    {data?.[field.name].slice(0, 2).map((name, index) => (
                      <CommandItem
                        key={index}
                        onSelect={(e) => {
                          dispatch(updateEntry({ name: field.name, value: e }));
                        }}
                      >
                        {name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            ) : field.fieldType === fieldType.selectInput ? (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={() => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <Select
                      onValueChange={(value) => console.log(value)}
                      defaultValue="a"
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">Option A</SelectItem>
                        <SelectItem value="b">Option B</SelectItem>
                        <SelectItem value="c">Option C</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>{field.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : field.fieldType === fieldType.datePicker ? (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={() => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
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
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>{field.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null
          )}
        </form>
        <Button type="submit">Save</Button>
      </Form>
    </>
  );
};

export default Entry;
