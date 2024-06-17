'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  weight: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'] as any
}
export const weightSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addWeight: (state) => {
      state.weight.push('0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
    },
    removeWeight: (state) => {
      state.weight = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
    },
    updataWeight: (state, action) => {
      const newArray = action.payload
      const index = newArray.index;
      state.weight[index] = newArray.value
    }
  }
})

export const { addWeight, removeWeight, updataWeight } = weightSlice.actions

export default weightSlice.reducer
