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
import { KeyboardEvent, KeyboardEvent, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "./store";
import { useFetchSale } from "./query";
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
import { deleteNewData, undeleteNewData, updataNewData } from "./filterDataSlice";
import { Checkbox } from "@/components/ui/checkbox";
let keysPressed = {};
const ColumnArray = [
  "serialNo",
  "vclNo",
  "supplierName",
  "farmerName",
  "typeItem",
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
  "cut",
  "delete",
  "date",
]

const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
  keysPressed[e.key] = false;
};
const handleKeyDown = (e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLButtonElement>, row: { index: number; }, column: { id: any; }) => {
  keysPressed[e.key] = true;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    const Element = document.querySelector(
      `[data-row-index='${row.index + 1}'][data-column-name='${column.id}']`
    );
    if (Element) {
      Element.focus();
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    const Element = document.querySelector(
      `[data-row-index='${row.index - 1}'][data-column-name='${column.id}']`
    );
    if (Element) {
      Element.focus();
    }
  }
  else if (e.key === "ArrowLeft") {
    e.preventDefault();
    const columnIndex = ColumnArray.indexOf(column.id)
    if ((ColumnArray.length - 1) >= columnIndex) {
      const Element = document.querySelector(
        `[data-row-index='${row.index}'][data-column-name='${ColumnArray[columnIndex - 1]}']`
      );
      if (Element) {
        Element.focus();
      }
    }
  }
  else if (e.key === "ArrowRight") {
    e.preventDefault();
    const columnIndex = ColumnArray.indexOf(column.id)
    if (0 <= columnIndex) {
      const Element = document.querySelector(
        `[data-row-index='${row.index}'][data-column-name='${ColumnArray[columnIndex + 1]}']`
      );
      if (Element) {
        Element.focus();
      }
    }
  }
  else {
  }
};

const onChangeHandle = (value, row, column) => {
  const dispatch = (data) => store.dispatch(data)
  const newArray = {
    row: row.index,
    column: column.id,
    value: value,
  };
  dispatch(updataNewData(newArray));
};

export const InputColumnField = ({ row, column }) => {
  const datas = useSelector((state: RootState) => state.filterDataReducer.datas);
  return (
    <div className="min-w-3">
      <Input
        defaultValue={row.getValue(column.id)}
        value={datas[row.index][column.id]}
        onChange={(e) => onChangeHandle(e.target.value, row, column)}
        data-row-index={row.index}
        data-column-name={column.id}
        onKeyUp={(e) => handleKeyUp(e)}
        onKeyDown={(e) => handleKeyDown(e, row, column)}
      />
    </div>
  );
};

export const ComboboxColumnField = ({ row, column }) => {
  const datas = useSelector((state: RootState) => state.filterDataReducer.datas);
  const allData = useSelector((state: RootState) => state.dataReducer.datas);
  const dataList = [...new Set(allData.map((item) => item[column.id]))];
  const [open, setOpen] = useState(false);
  const thisValue = datas[row.index][column.id];
  const [value, setValue] = useState(thisValue);
  const [newValue, setNewValue] = useState('');
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
            className="w-[200px] justify-between"
            onKeyUp={(e) => handleKeyUp(e)}
            onKeyDown={(e) => handleKeyDown(e, row, column)}
          >
            {value !== ''
              ? value
              : "Select dataValue..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${column.id}...`}
              defaultValue={thisValue}
              onValueChange={(e: string) => {
                setNewValue(e)
                console.log(e)
              }}
            />
            <CommandList>
              <CommandEmpty>
                No {column.id} found.

                <CommandItem
                  key={newValue}
                  onSelect={() => {
                    setValue(newValue);
                    setOpen(false);
                    onChangeHandle(newValue, row, column);
                  }}
                >
                  {" "}
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === newValue ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {newValue} Titik
                </CommandItem>
              </CommandEmpty>
              <CommandGroup>
                {dataList.map((dataValue: { value: Key | null | undefined; label: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
                  <CommandItem
                    key={dataValue}
                    onSelect={() => {
                      setValue(dataValue);
                      setOpen(false);
                      onChangeHandle(dataValue, row, column);
                    }}
                  >
                    {" "}
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === dataValue ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {dataValue}
                  </CommandItem>
                ))}
              </CommandGroup>

            </CommandList>
          </Command>
          <Button onClick={() => {
            setValue(newValue)
            setOpen(false)
            onChangeHandle(newValue, row, column)
          }
          }>Add New Value</Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const SelectColumnField = ({ row, column }) => {
  const datas = useSelector((state: RootState) => state.filterDataReducer.datas);
  const thisValue = datas[row.index][column.id];
  return (
    <Select
      defaultValue={thisValue}
      onValueChange={(value) => onChangeHandle(value, row, column)}
    >
      <SelectTrigger
        data-row-index={row.index}
        data-column-name={column.id}
        onKeyUp={(e) => handleKeyUp(e)}
        onKeyDown={(e) => handleKeyDown(e, row, column)}
        className="w-64">
        <SelectValue
          placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent
      >
        <SelectItem value="peti">Peti</SelectItem>
        <SelectItem value="daba">Daba</SelectItem>
        <SelectItem value="box">Box</SelectItem>
        <SelectItem value="plate">Plate</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const DateColumnField = ({ row, column }) => {
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
          onKeyUp={(e) => handleKeyUp(e)}
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
          onSelect={handleDateSelect}
        />
      </PopoverContent>
    </Popover>
  )
}


export const DeleteColumnField = ({ row, column }) => {
  const deleteAndUndelete = (e: boolean) => {
    const dispatch = store.dispatch;
    if (e) {
      dispatch(deleteNewData(row.index))
    }
    else {
      dispatch(undeleteNewData(row.index))
    }
  }
  return (
    <div className="min-w-3">
      <Checkbox
        onCheckedChange={(e: boolean) => deleteAndUndelete(e)}
        data-row-index={row.index}
        data-column-name={column.id}
        onKeyUp={(e) => handleKeyUp(e)}
        onKeyDown={(e) => handleKeyDown(e, row, column)}
      />
    </div>
  );
};