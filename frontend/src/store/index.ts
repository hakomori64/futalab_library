import { configureStore } from '@reduxjs/toolkit';
import groupReducer from './groupSlice';
import bookReducer from './bookSlice';
import rentalReducer from './rentalSlice';
import invitationReducer from './invitationSlice';

export const store = configureStore({
  reducer: {
    group: groupReducer,
    book: bookReducer,
    rental: rentalReducer,
    invitation: invitationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;