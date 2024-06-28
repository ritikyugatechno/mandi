'use client'
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  firstAdd: true,
  datas: [] as any
}
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.datas = action.payload;
      state.firstAdd = false;
    },
    removeData: (state, action) => {
      // state.datas = state.todos.filter((todo) => todo.id !== action.payload)
    },
    updataData: (state, action) => {
      const newArray = action.payload
      const row = newArray.row;
      const column = newArray.column
      state.datas[row][column] = newArray.value
    }
  }
})

export const { addData, removeData, updataData } = dataSlice.actions

export default dataSlice.reducer
