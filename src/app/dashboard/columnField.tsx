import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useFetchSale } from "./query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
let keysPressed = {};
const handleKeyUp = (e) => {
  keysPressed[e.key] = false;
};
const handleKeyDown = (e, row, column) => {
  keysPressed[e.key] = true;
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    const currentElement = e.target;
    const allElements = document.querySelectorAll("[role='combobox']");
    const currentIndex = Array.from(allElements).indexOf(currentElement);
    let nextElement;
    if (e.key === "ArrowRight") {
      nextElement = allElements[currentIndex + 1];
    } else if (e.key === "ArrowLeft") {
      nextElement = allElements[currentIndex - 1];
    }
    if (nextElement) {
      nextElement.focus();
    }
    // setOpen(true);
  } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();
    const currentElement = e.target;
    const allElements = document.querySelectorAll("[role='combobox']");
    const currentIndex = Array.from(allElements).indexOf(currentElement);
    let nextElement;
    if (e.key === "ArrowRight") {
      nextElement = allElements[currentIndex + 1];
    } else if (e.key === "ArrowLeft") {
      nextElement = allElements[currentIndex - 1];
    }
    if (nextElement) {
      nextElement.focus();
    }
  } else if (keysPressed["Shift"] && keysPressed["Enter"]) {
    e.preventDefault();
    const Element = document.querySelector(
      `[data-row-index='${row.index - 1}'][data-column-name='${column.id}']`
    );
    if (Element) {
      Element.focus();
    }
  } else if (e.key === "Enter") {
    e.preventDefault();
    const Element = document.querySelector(
      `[data-row-index='${row.index + 1}'][data-column-name='${column.id}']`
    );
    if (Element) {
      Element.focus();
    }
  }
};

const onChangeHandle = (e) => {
  const newArray = {
    row: row.index,
    column: column.id,
    value: e.target.value,
  };
  dispatch(updataDate(newArray));
};

export const InputColumnField = ({ row, column }) => {
  return (
    <>
      <div>
        <Input
          data-row-index={row.index}
          data-column-name={column.id}
          onKeyUp={(e) => handleKeyUp(e)}
          onKeyDown={(e) => handleKeyDown(e, row, column)}
        />
      </div>
    </>
  );
};

export const ComboboxColumnField = ({ row, column, cell }) => {
  const datas = useSelector((state: RootState) => state.datas);
  const [open, setOpen] = useState(false);
  const thisValue = datas[row.index][column.id];
  const [value, setValue] = useState(thisValue);
  const { data, isLoading, isError, refetch } = useFetchSale(
    new Date(),
    "rj41"
  );
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
            onKeyDown={(e) => handleKeyDown(e, row, column, cell)}
          >
            {value
              ? data.find((dataValue) => dataValue.value === value)?.label
              : "Select dataValue..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Search framework..."
              defaultValue={thisValue}
              onChange={onChangeHandle}
            />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {data.map((dataValue) => (
                  <CommandItem
                    key={dataValue.value}
                    onSelect={() => {
                      setValue(dataValue.value);
                      setOpen(false);
                    }}
                  >
                    {" "}
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === dataValue.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {dataValue.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const SelectColumnField = ({ row, column }) => {
  return (
    <Select>
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
  );
};


