'use client'
import { configureStore } from '@reduxjs/toolkit';
import lastEntryReducer from './lastEntrySlice';
import weightReducer from './weightSlice';

export const store = configureStore({
  reducer: { lastEntryReducer, weightReducer }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
