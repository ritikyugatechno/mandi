'use client'
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  datas: []
}
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action) => {
      const data = {
        id: nanoid(),
        text: action.payload
      }
      state.datas = 'hello'

    },
    removeData: (state, action) => {
      // state.datas = state.todos.filter((todo) => todo.id !== action.payload)
    },
    updataData: (state, action) => {

    }
  }
})

export const { addData, removeData, updataData } = dataSlice.actions

export default dataSlice.reducer
