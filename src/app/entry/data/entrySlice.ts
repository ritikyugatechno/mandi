'use client'
import { createSlice } from '@reduxjs/toolkit';
import { formName } from '../form/formData';

const initialState = {
  supplierName: '',
  farmerName: '',
  customerName: '',
  lot: '',
  itemName: '',
  vclNo: '',
  serialNo: '',
  nug: '',
  typeItem: '',
  date: '',
  freightRate: '',
  freightKg: '',
  otherCharge: '',
  labourRate: '',
  labourKg: '',
}
export const entrySlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateEntry: (state, action) => {
      const array = action.payload as { name: formName, value: string };
      state[array.name] = array.value;
    },
    resetEntry: (state)=>{
      state['serialNo'] = (parseInt(state['serialNo']) + 1) + '';
      state['nug'] = ''
    }
  }
})

export const { updateEntry, resetEntry } = entrySlice.actions

export default entrySlice.reducer
