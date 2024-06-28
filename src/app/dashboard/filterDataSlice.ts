'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  datas: [] as any,
  delete: [] as any
}
export const dataSlice = createSlice({
  name: 'filterdata',
  initialState,
  reducers: {
    addNewData: (state, action) => {
      state.datas = action.payload;
    },
    updataNewData: (state, action) => {
      const newArray = action.payload
      const row = newArray.row;
      const column = newArray.column
      state.datas[row][column] = newArray.value
    },
    deleteNewData: (state, action) => {
      const row = action.payload
      const removedRow = state.datas[row].id;
      state.delete.push(removedRow);
    },
    undeleteNewData: (state,action) => {
      const row = action.payload
      const removedRow = state.datas[row].id;
      state.delete = state.delete.filter((id: number) => id !== removedRow)
    }
  }
})

export const { addNewData, updataNewData , deleteNewData, undeleteNewData } = dataSlice.actions

export default dataSlice.reducer
