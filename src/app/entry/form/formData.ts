export enum formName {
  serialNo = 'serialNo',
  supplierName = 'supplierName',
  farmerName = 'farmerName',
  itemName = 'itemName',
  nug = 'nug',
  customerName = 'customerName',
  typeItem = 'typeItem',
  date = 'date',
  vclNo = 'vclNo',
  freightRate = 'freightRate',
  otherCharge = 'otherCharge',
  labourRate = 'labourRate',
}

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
  name: formName;
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
    name: formName.serialNo,
    // className: 'w-40',
    type: 'number',
    placeholder: 'Enter serialNo',
    autofocus: true
  },
  {
    fieldType: fieldType.commandInput,
    name: formName.supplierName,
    // className: 'w-40',
    type: 'text',
    placeholder: 'Enter supplierName',
  },
  {
    fieldType: fieldType.commandInput,
    name: formName.farmerName,
    // className: 'w-40',
    type: 'text',
    placeholder: 'Enter farmerName',
  },
  {
    fieldType: fieldType.selectInput,
    name: formName.typeItem,
    // className: 'w-40',
    type: 'text',
    placeholder: 'Enter typeItem',
  },
  {
    fieldType: fieldType.input,
    name: formName.nug,
    // className: 'w-40',
    type: 'number',
    placeholder: 'Enter nug',
  },
  {
    fieldType: fieldType.commandInput,
    name: formName.customerName,
    // className: 'w-40',
    type: 'text',
    placeholder: 'Enter customerName',
  },
  {
    fieldType: fieldType.weightInput,
    name: formName.serialNo,
    type: 'number',
    placeholder: 'Enter serialNo',
  },
  {
    fieldType: fieldType.commandInput,
    name: formName.itemName,
    // className: 'w-40',
    type: 'text',
    placeholder: 'Enter itemName',
  },
  {
    fieldType: fieldType.datePicker,
    name: formName.date,
    // className: 'w-40',
    type: 'date',
    placeholder: 'Enter date',
  },
  {
    fieldType: fieldType.commandInput,
    name: formName.vclNo,
    // className: 'w-40',
    type: 'text',
    placeholder: 'Enter vclNo',
  },
  {
    fieldType: fieldType.input,
    name: formName.freightRate,
    // className: 'w-40',
    type: 'number',
    placeholder: 'Enter freightRate',
  },
  {
    fieldType: fieldType.input,
    name: formName.otherCharge,
    // className: 'w-40',
    type: 'number',
    placeholder: 'Enter otherCharge',
  },
  {
    fieldType: fieldType.input,
    name: formName.labourRate,
    // className: 'w-40',
    type: 'number',
    placeholder: 'Enter labourRate',
  },
]
