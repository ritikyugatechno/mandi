import { z } from "zod";
import { formSchema } from "./formSchema";

export enum fieldType {
  input = 'input',
  commandInput = 'commandInput',
  selectInput = 'selectInput',
  datePicker = 'datePicker',
  weightInput = 'weightInput',
  seprater = 'seprater'
}

interface FormDataItem {
  fieldType: fieldType;
  name: keyof z.infer<typeof formSchema>;
  className?: string;
  type: string;
  placeholder: string;
  description?: string;
  autofocus?: boolean;
}

type formDataType = FormDataItem[];

export const formData: formDataType = [
  {
    fieldType: fieldType.input,
    name: 'serialNo',
    className: 'w-40',
    type: 'number',
    placeholder: 'Enter serialNo',
    autofocus: true
  },
  {
    fieldType: fieldType.commandInput,
    name: 'supplierName',
    className: 'w-40',
    type: 'text',
    placeholder: 'Enter supplierName',
  },
  {
    fieldType: fieldType.commandInput,
    name: 'farmerName',
    className: 'w-40',
    type: 'text',
    placeholder: 'Enter farmerName',
  },
  {
    fieldType: fieldType.commandInput,
    name: 'itemName',
    className: 'w-40',
    type: 'text',
    placeholder: 'Enter itemName',
  },
  {
    fieldType: fieldType.input,
    name: 'nug',
    className: 'w-40',
    type: 'number',
    placeholder: 'Enter nug',
  },
  {
    fieldType: fieldType.commandInput,
    name: 'customerName',
    className: 'w-40',
    type: 'text',
    placeholder: 'Enter customerName',
  },
  {
    fieldType: fieldType.selectInput,
    name: 'typeItem',
    className: 'w-40',
    type: 'text',
    placeholder: 'Enter typeItem',
  },
  {
    fieldType: fieldType.datePicker,
    name: 'date',
    className: 'w-40',
    type: 'date',
    placeholder: 'Enter date',
  },
  {
    fieldType: fieldType.commandInput,
    name: 'vclNo',
    className: 'w-40',
    type: 'text',
    placeholder: 'Enter vclNo',
  },
  {
    fieldType: fieldType.input,
    name: 'freightRate',
    className: 'w-40',
    type: 'number',
    placeholder: 'Enter freightRate',
  },
  {
    fieldType: fieldType.input,
    name: 'otherCharge',
    className: 'w-40',
    type: 'number',
    placeholder: 'Enter otherCharge',
  },
  {
    fieldType: fieldType.input,
    name: 'labourRate',
    className: 'w-40',
    type: 'number',
    placeholder: 'Enter labourRate',
  },
  
]
