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
}

type formDataType = FormDataItem[];

export const formData: formDataType = [
  {
    fieldType: fieldType.input,
    name: 'serialNo',
    className: 'w-40',
    type: 'number',
    placeholder: 'Enter serialNo',
  },
]
