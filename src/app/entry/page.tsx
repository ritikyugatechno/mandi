"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Weight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import errorMap from "zod/locales/en.js";
import { isDateAfterType } from "react-day-picker";

const initialFields = Array.from({ length: 10 }, (_, i) => ({
  name: `w${i + 1}`,
  label: `W${i + 1}`,
}));

const formSchema = z.object({
  serialNo: z.string(),
  supplierName: z
    .string({ required_error: "Supplier name is required" })
    .min(1),
  farmerName: z.string({ required_error: "Farm name is required" }),
  itemName: z.string({ required_error: "Item name is required" }),
  nug: z.string({ required_error: "Nug is required" }),
  customerName: z.string({ required_error: "Customer name is required" }),
  typeItem: z.string({ required_error: "Item name is required" }),
  date: z.date({ required_error: "Date is required" }),
  vclNo: z.string({ required_error: "VclNo is required" }),
  freightRate: z.string({ required_error: "FreightRate is required" }),
  otherCharge: z.string({ required_error: "OtherCharge is required" }),
  labourRate: z.string({ required_error: "LabourRate is required" }),
  weight: z.array(z.string().optional()),
});

export default function Sale() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serialNo: "",
      supplierName: "",
      farmerName: "",
      typeItem: "",
      nug: "",
      customerName: "",
      itemName: "",
      date: new Date(),
      vclNo: "",
      freightRate: "",
      otherCharge: "",
      labourRate: "",
      weight: Array(10).fill(""),
    },
  });
  const [rows, setRows] = useState(initialFields);
  const [date, setDate] = useState<Date>();
  const [responseMessage, setResponseMessage] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  //Command
  const [commandData, setCommandData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...form.getValues("weight")];
    newValues[index] = value;
    form.setValue("weight", newValues);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const formData = values as any;
    formData.serialNo = parseInt(values.serialNo);
    formData.nug = parseInt(values.nug);
    formData.freightRate = parseFloat(values.freightRate);
    formData.otherCharge = parseFloat(values.otherCharge);
    formData.labourRate = parseFloat(values.labourRate);
    // formData.weight = values.weight.map((w) => (w ? parseFloat(w) : null));
    try {
      const response = await fetch("/api/sale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("respone is", response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setResponseMessage(`Success: ${data.message}`);
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addFields = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFields = [];
    const startIndex = rows.length + 1;
    for (let i = 0; i < 10; i++) {
      newFields.push({
        name: `w${startIndex + i}`,
        label: `W${startIndex + i}`,
      });
    }
    setRows([...rows, ...newFields]);
  };

  useEffect(() => {
    fetch("/api/dashboard/get-data-by-date")
      .then((response) => {
        response.json().then((data) => {
          console.log("useEffect", data);
          setFilterData(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handle filter to ensure unique supplier names
  const handleFilter = (value) => {
    if (value === "") {
      setCommandData([]);
      return;
    }

    const res = filterData
      .filter((f) => f.supplierName.toLowerCase().includes(value.toLowerCase()))
      .reduce((unique, item) => {
        if (!unique.some((obj) => obj.supplierName === item.supplierName)) {
          unique.push(item);
        }
        return unique;
      }, []);

    setCommandData(res);
  };

  return (
    <>
      <Form {...form}>
        <form className="m-10" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="serialNo"
              render={({ field }) => (
                <FormItem className="w-72">
                  <FormMessage />
                  <FormLabel>Serial Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Serial Number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="supplierName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormMessage />
                  <FormLabel>Supplier Name</FormLabel>
                  <Command>
                    <FormControl>
                      <CommandInput
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleFilter(value);
                        }}
                        placeholder="Enter Supplier Name..."
                      />
                    </FormControl>
                    <CommandList>
                      <CommandGroup>
                        {commandData.map((c, index) => (
                          <CommandItem
                            key={index}
                            onSelect={() => {
                              form.setValue("supplierName", c.supplierName);
                              setCommandData([]);
                            }}
                          >
                            {c.supplierName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="farmerName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Farmer Name</FormLabel>
                  <FormControl>
                    <Command>
                      <CommandInput
                        onValueChange={field.onChange}
                        placeholder="Enter Farmer Name..."
                      />
                      <CommandList>
                        <CommandGroup></CommandGroup>
                      </CommandList>
                    </Command>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="typeItem"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Type Item</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-96 mt-8">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="box">Box</SelectItem>
                        <SelectItem value="peti">Peti</SelectItem>
                        <SelectItem value="daba">Daba</SelectItem>
                        <SelectItem value="plate">Plate</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nug"
              render={({ field }) => (
                <FormItem className="w-72">
                  <FormMessage />
                  <FormLabel>Nug</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter Nug" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Command>
                      <CommandInput
                        onValueChange={field.onChange}
                        placeholder="Enter Customer Name..."
                      />
                      <CommandList>
                        <CommandGroup>
                          <CommandItem> Hello </CommandItem>
                          <CommandItem> He </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4 flex-wrap">
            {rows.map((fieldConfig, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`weight.${index}`}
                render={({ field }) => (
                  <FormItem className="w-72">
                    <FormLabel>{fieldConfig.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Enter ${fieldConfig.label}...`}
                        type="number"
                        {...field}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          field.onChange(e);
                          handleInputChange(index, e.target.value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <Button onClick={addFields} className="mt-8 p-2 bg-blue-500 ">
            Add More Fields
          </Button>
          <div className="flex gap-4 items-center">
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Command>
                      <CommandInput
                        onValueChange={field.onChange}
                        placeholder="Enter Item Name..."
                        className="mt-0"
                      />
                      <CommandList></CommandList>
                    </Command>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vclNo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormMessage />
                  <FormLabel>VCL No</FormLabel>
                  <FormControl>
                    <Command>
                      <CommandInput
                        onValueChange={field.onChange}
                        typeof="number"
                        placeholder="Enter VCL No..."
                      />
                      <CommandList>
                        <CommandGroup heading=""></CommandGroup>
                      </CommandList>
                    </Command>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormMessage />
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Popover
                      open={isPopoverOpen}
                      onOpenChange={setIsPopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                          onClick={() => setIsPopoverOpen(true)}
                        >
                          <CalendarIcon className="mr-2 " />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className=" p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => {
                            setDate(newDate);
                            setIsPopoverOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4 ">
            <FormField
              control={form.control}
              name="freightRate"
              render={({ field }) => (
                <FormItem className="w-72">
                  <FormMessage />
                  <FormLabel>Freight Rate</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Freight Rate"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otherCharge"
              render={({ field }) => (
                <FormItem className="w-72">
                  <FormMessage />
                  <FormLabel>Other Charges</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Other Charges"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="labourRate"
              render={({ field }) => (
                <FormItem className="w-72">
                  <FormMessage />
                  <FormLabel>Labour Rate</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Labour Rate"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
