export enum formName {
  serialNo = 'serialNo',
  supplierName = 'supplierName',
  farmerName = 'farmerName',
  lot = 'lot',
  itemName = 'itemName',
  nug = 'nug',
  customerName = 'customerName',
  typeItem = 'typeItem',
  date = 'date',
  vclNo = 'vclNo',
  freightRate = 'freightRate',
  freightKg = 'freightKg',
  otherCharge = 'otherCharge',
  labourRate = 'labourRate',
  labourKg = 'labourKg',
}

export enum fieldType {
  input = 'input',
  commandInput = 'commandInput',
  selectInput = 'selectInput',
  selectInputKg = 'selectInputKg',
  datePicker = 'datePicker',
  weightInput = 'weightInput',
  seprater = 'seprater'
}

export enum NextSelect {
  typeItem = 'typeItem',
  freightKg = 'freightKg',
  labourKg = 'labourKg'
}

interface FormDataItem {
  fieldType: fieldType;
  name: formName;
  className?: string;
  type: string;
  placeholder: string;
  description?: string;
  autofocus?: boolean;
  dataKey?: NextSelect;
}

type formDataType = FormDataItem[];

export const formData: formDataType = [
  {
    fieldType: fieldType.input,
    name: formName.serialNo,
    type: 'number',
    className: 'w-[80px]',
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
    fieldType: fieldType.commandInput,
    name: formName.lot,
    className: 'w-[100px]',
    type: 'text',
    placeholder: 'Enter Lot',
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
    className: 'w-[80px]',
    type: 'number',
    placeholder: 'Enter nug',
    dataKey: NextSelect.typeItem,
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
    fieldType: fieldType.selectInputKg,
    name: formName.freightKg,
    type: 'number',
    placeholder: 'Enter freightKgNug',
    dataKey: NextSelect.freightKg,
  },
  {
    fieldType: fieldType.input,
    name: formName.labourRate,
    type: 'number',
    placeholder: 'Enter labourRate',
    dataKey: NextSelect.freightKg,
  },
  {
    fieldType: fieldType.selectInputKg,
    name: formName.labourKg,
    type: 'number',
    placeholder: 'Enter labourKgNug',
    dataKey: NextSelect.labourKg,
  },
  {
    fieldType: fieldType.input,
    name: formName.otherCharge,
    // className: 'w-40',
    type: 'number',
    placeholder: 'Enter otherCharge',
    dataKey: NextSelect.labourKg,
  },
]
