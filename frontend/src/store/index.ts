import { configureStore } from '@reduxjs/toolkit';
import groupReducer from './groupSlice';
import bookReducer from './bookSlice';

export const store = configureStore({
  reducer: {
    group: groupReducer,
    book: bookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;