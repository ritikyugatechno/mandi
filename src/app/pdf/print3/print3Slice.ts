'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstStartPoint : 1,
}
export const Print3Slice = createSlice({
  name: 'print3',
  initialState,
  reducers: {
    updataFistStartPoint: (state, action) => {
        state.firstStartPoint = action.payload
    }
  }
})

export const { updataFistStartPoint } = Print3Slice.actions

export default Print3Slice.reducer
