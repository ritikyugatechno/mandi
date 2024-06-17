'use client'
import { createSlice } from '@reduxjs/toolkit';

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
  }
})

export const { addData } = dataSlice.actions

export default dataSlice.reducer
