"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useFetchVclNo } from "./query";
import { keyboardShortcut } from "../entry/keyboardShortcut";
import Image from "next/image";

// Define an interface for the image object
interface Image {
  id: string;
  name: string;
}

export default function ImageManager() {
  const [allImages, setAllImages] = useState<Image[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [date, setDate] = useState<string>("");
  const [vehicleNumber, setVehicleNumber] = useState<string>("");
  const [commandInputValue, setCommandInputValue] = useState<string>(""); // State for CommandInput value
  const [imageSrc, setImageSrc] = useState<Image[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isFocused, setIsFocused] = useState(false);

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!image || !date || !vehicleNumber) {
      toast.error("Please upload an image and fill out all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("date", date);
      formData.append("vehicleNumber", vehicleNumber);

      const response = await axios.post("/api/upload", formData);
      const data = await response.data;

      setAllImages([...allImages, data.image]);
      toast.success("Image uploaded successfully.");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image. Please try again.");
    }
  };

  const handleSearch = async () => {
    if (!date || !vehicleNumber) {
      toast.error("Please enter the date and vehicle number to search.");
      return;
    }
    try {
      const response = await axios.post(
        `/api/getimage?date=${date}&vehicleNumber=${vehicleNumber}`
      );
      const { image } = response.data;

      if (image) {
        setImageSrc(image);
      } else {
        toast.info("Image not found");
        setImageSrc([]);
      }
    } catch (error) {
      console.error("Error searching for image:", error);
      toast.error("Failed to search for an image. Please try again.");
      setImageSrc([]);
    }
  };

  const deleteImage = async (imageId: string, imageUrl: string) => {
    try {
      await axios.delete("/api/delete", { data: { imageId, imageUrl } });
      toast.success("Image deleted successfully");
      setImageSrc(imageSrc.filter((img) => img.id !== imageId));
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete the image. Please try again.");
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsPopoverOpen(false);
    if (date) {
      setDate(format(date, "yyyy-MM-dd"));
    }
  };

  const { data } = useFetchVclNo();
  const allData = [...new Set(data?.map((item: any) => item.vclNo))];

  const onChangeHandle = (value: string) => {
    setVehicleNumber(value);
    setCommandInputValue(value); // Update the CommandInput value state
  };

  keyboardShortcut();

  return (
    <main className="flex min-h-screen flex-col items-center p-6 sm:p-12 md:p-24 gap-6 md:gap-8">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md mx-auto flex flex-col gap-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Upload and Search Image</h2>

        <Input
          type="file"
          data-key="tab"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setImage(e.target.files?.[0] || null)
          }
          className="border border-gray-300 rounded p-2"
        />

        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger data-key="tab" asChild>
            <Button
              variant="outline"
              className="w-full flex items-center justify-between p-3 border rounded"
              onClick={() => setIsPopoverOpen(true)}
            >
              <CalendarIcon className="h-5 w-5" />
              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 mt-2">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="border rounded-lg"
            />
          </PopoverContent>
        </Popover>

        <Command className="rounded-lg border w-full shadow-md relative overflow-visible">
          <CommandInput
            placeholder="Search"
            data-key="tab"
            value={commandInputValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onValueChange={(value: string) => onChangeHandle(value)}
          />
          <CommandList
            className={`${
              isFocused ? "" : "hidden"
            } absolute w-full top-10 z-10 bg-white shadow-lg border`}
          >
            <CommandEmpty>No Vehicle Number Found</CommandEmpty>
            <CommandGroup>
              {allData.slice(0, 5).map((data: string) => (
                <CommandItem
                  key={data}
                  value={data}
                  onSelect={() => {
                    onChangeHandle(data); // Update the input when selecting an item
                  }}
                >
                  {data}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>

        <Button
          data-key="tab"
          type="submit"
          className="w-full bg-red-500 text-white p-3 rounded"
        >
          Upload
        </Button>
      </form>

      <div className="mt-6 w-full max-w-md mx-auto">
        <Button
          type="button"
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white p-3 rounded"
        >
          Search
        </Button>
      </div>

      <div className="w-full max-w-md mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {imageSrc.length > 0 &&
          imageSrc.map((img) => (
            <div
              key={img.id}
              className="flex flex-col items-center gap-2 border p-4 rounded-lg shadow-sm"
            >
              <Image
                src={`/image/${img.name}`}
                alt="Searched image"
                width={200}
                height={200}
                className="w-full h-auto rounded-lg"
              />
              <Button
                onClick={() => deleteImage(img.id, `/image/${img.name}`)}
                className="w-full bg-red-500 text-white p-2 rounded"
              >
                Delete
              </Button>
            </div>
          ))}
      </div>

      <ToastContainer />
    </main>
  );
}
