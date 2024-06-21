'use client'
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import filterDataReducer from './filterDataSlice';

export const store = configureStore({
  reducer: {dataReducer,filterDataReducer}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
