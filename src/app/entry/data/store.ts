'use client'
import { configureStore } from '@reduxjs/toolkit';
import entryReducer from './entrySlice';
import weightReducer from './weightSlice';

export const store = configureStore({
  reducer: { entryReducer, weightReducer }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
