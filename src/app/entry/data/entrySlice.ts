'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  supplierName: '',
  farmerName: '',
  customerName: '',
  itemName: '',
  vclNo: ''
}
export const entrySlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action) => {
      // state.datas = action.payload;
      // state.firstAdd = false;
    },
    updateEntry: (state, action) => {
      const array = action.payload;
      state[array.name] = array.value;
    }
  }
})

export const { addData, updateEntry } = entrySlice.actions

export default entrySlice.reducer
