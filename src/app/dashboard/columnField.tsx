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
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "./store";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { updataData } from "./dataSlice";
import {
  deleteNewData,
  undeleteNewData,
  updataNewData,
} from "./filterDataSlice";
import { Checkbox } from "@/components/ui/checkbox";

interface Column {
  id: string;
}

interface Row {
  index: number;
  getValue: (id: string) => string;
}

let keysPressed: { [key: string]: boolean } = {};

const ColumnArray: string[] = [
  "serialNo",
  "vclNo",
  "supplierName",
  "farmerName",
  "cut",
  "sNug",
  "avgWeight",
  "supplierRate",
  "customerRate",
  "customerName",
  "cNug",
  "netWeight",
  "itemName",
  "grossWeight",
  "freightRate",
  "otherCharge",
  "labourRate",
  "weight",
  "delete",
  "date",
  "typeItem",
  "freightKg",
  "labourKg",
];

const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
  keysPressed[e.key] = false;
};

const handleKeyDown = (
  e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLButtonElement>,
  row: Row,
  column: Column
) => {
  keysPressed[e.key] = true;
  if (e.key === "ArrowDown" || e.key === "Enter") {
    e.preventDefault();
    const Element = document.querySelector(
      `[data-row-index='${row.index + 1}'][data-column-name='${column.id}']`
    ) as HTMLElement;
    if (Element) {
      Element.focus();
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    const Element = document.querySelector(
      `[data-row-index='${row.index - 1}'][data-column-name='${column.id}']`
    ) as HTMLElement;
    if (Element) {
      Element.focus();
    }
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    const columnIndex = ColumnArray.indexOf(column.id);
    if (ColumnArray.length - 1 >= columnIndex) {
      const Element = document.querySelector(
        `[data-row-index='${row.index}'][data-column-name='${
          ColumnArray[columnIndex - 1]
        }']`
      ) as HTMLElement;
      if (Element) {
        Element.focus();
      }
    }
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    const columnIndex = ColumnArray.indexOf(column.id);
    if (0 <= columnIndex) {
      const Element = document.querySelector(
        `[data-row-index='${row.index}'][data-column-name='${
          ColumnArray[columnIndex + 1]
        }']`
      ) as HTMLElement;
      if (Element) {
        Element.focus();
      }
    }
  }
};

const onChangeHandle = (value: any, row: Row, column: Column) => {
  const dispatch = (data: any) => store.dispatch(data);
  const newArray = {
    row: row.index,
    column: column.id,
    value: value,
  };
  dispatch(updataNewData(newArray));
};

export const InputColumnField = ({
  row,
  column,
}: {
  row: Row;
  column: Column;
}) => {
  const datas = useSelector(
    (state: RootState) => state.filterDataReducer.datas
  );
  return (
    <div className="">
      <Input
        className=""
        defaultValue={row.getValue(column.id)}
        value={datas[row.index][column.id]}
        onChange={(e) => onChangeHandle(e.target.value, row, column)}
        data-row-index={row.index}
        data-column-name={column.id}
        onKeyUp={(e) => handleKeyUp(e)}
        onKeyDown={(e) => handleKeyDown(e, row, column)}
        onFocus={(e) => e.target.select()}
      />
    </div>
  );
};

export const ComboboxColumnField = ({
  row,
  column,
}: {
  row: Row;
  column: Column;
}) => {
  const datas = useSelector(
    (state: RootState) => state.filterDataReducer.datas
  );
  const allData = useSelector((state: RootState) => state.dataReducer.datas);
  const dataList = [...new Set(allData.map((item: any) => item[column.id]))];
  const [open, setOpen] = useState(false);
  const thisValue = datas[row.index][column.id];
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            data-row-index={row.index}
            data-column-name={column.id}
            aria-expanded={open}
            className="w-fit min-w-full justify-between"
            onKeyUp={(e: any) => handleKeyUp(e)}
            onKeyDown={(e: any) => handleKeyDown(e, row, column)}
          >
            {thisValue !== "" ? thisValue : "Select dataValue..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${column.id}...`}
              value={thisValue}
              onValueChange={(e: string) => {
                onChangeHandle(e, row, column);
              }}
            />
            <CommandList>
              <CommandEmpty>No {column.id} found.</CommandEmpty>
              <CommandGroup>
                {dataList.map((dataValue: string) => (
                  <CommandItem
                    key={dataValue}
                    onSelect={() => {
                      setOpen(false);
                      onChangeHandle(dataValue, row, column);
                    }}
                  >
                    {" "}
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        thisValue === dataValue ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {dataValue}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <Button
            onClick={() => {
              setOpen(false);
              onChangeHandle(thisValue, row, column);
            }}
          >
            Add New Value
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const SelectColumnField = ({
  row,
  column,
}: {
  row: Row;
  column: Column;
}) => {
  const datas = useSelector(
    (state: RootState) => state.filterDataReducer.datas
  );
  const thisValue = datas[row.index][column.id];
  return (
    <Select
      value={thisValue}
      onValueChange={(value) => onChangeHandle(value, row, column)}
    >
      <SelectTrigger
        data-row-index={row.index}
        data-column-name={column.id}
        onKeyUp={(e: any) => handleKeyUp(e)}
        onKeyDown={(e: any) => handleKeyDown(e, row, column)}
        className="w-64"
      >
        <SelectValue defaultValue={thisValue} placeholder="Select an option" />
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
  );
};

export const SelectKgColumnField = ({
  row,
  column,
}: {
  row: Row;
  column: Column;
}) => {
  const datas = useSelector(
    (state: RootState) => state.filterDataReducer.datas
  );
  const thisValue = datas[row.index][column.id] ? "true" : "false";

  const valueChange = (e: string) => {
    let value = false;
    if (e === "true") {
      value = true;
    }
    onChangeHandle(value, row, column);
  };
  return (
    <Select value={thisValue} onValueChange={(value) => valueChange(value)}>
      <SelectTrigger
        data-row-index={row.index}
        data-column-name={column.id}
        onKeyUp={(e: any) => handleKeyUp(e)}
        onKeyDown={(e: any) => handleKeyDown(e, row, column)}
        className="w-64"
      >
        <SelectValue defaultValue={thisValue} placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="true">Kg</SelectItem>
        <SelectItem value="false">Nug</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const DateColumnField = ({
  row,
  column,
}: {
  row: Row;
  column: Column;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const handleDateSelect = async (newDate: Date) => {
    setSelectedDate(newDate);
    setIsPopoverOpen(false);
    onChangeHandle(newDate, row, column);
  };
  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-row-index={row.index}
          data-column-name={column.id}
          onKeyUp={(e: any) => handleKeyUp(e)}
          onKeyDown={(e) => handleKeyDown(e, row, column)}
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
          onSelect={(e: any) => handleDateSelect(e)}
        />
      </PopoverContent>
    </Popover>
  );
};

export const DeleteColumnField = ({
  row,
  column,
}: {
  row: Row;
  column: Column;
}) => {
  const deleteAndUndelete = (e: boolean) => {
    const dispatch = store.dispatch;
    if (e) {
      dispatch(deleteNewData(row.index));
    } else {
      dispatch(undeleteNewData(row.index));
    }
  };
  return (
    <div className="min-w-3">
      <Checkbox
        onCheckedChange={(e: boolean) => deleteAndUndelete(e)}
        data-row-index={row.index}
        data-column-name={column.id}
        onKeyUp={(e: any) => handleKeyUp(e)}
        onKeyDown={(e: any) => handleKeyDown(e, row, column)}
      />
    </div>
  );
};
