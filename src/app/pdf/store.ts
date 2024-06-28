'use client'
import { configureStore } from '@reduxjs/toolkit';
import print3Slice from './print3/print3Slice';

export const store = configureStore({
  reducer: {print3Slice}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
