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
    addEntry: (state, action) => {
      Object.keys(state).forEach(key => {
        state[key] = action.payload[key];
      })
      // state.supplierName = action.payload.supplierName;
      // state.farmerName = action.payload.farmerName;

    },
    updateEntry: (state, action) => {
      const array = action.payload as { name: formName, value: string };
      state[array.name] = array.value;
    },
    resetEntry: (state) => {
      state['serialNo'] = (parseInt(state['serialNo']) + 1) + '';
    }
  }
})

export const { addEntry, updateEntry, resetEntry } = entrySlice.actions

export default entrySlice.reducer
