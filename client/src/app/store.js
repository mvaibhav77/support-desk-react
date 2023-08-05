import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import ticketReducer from '../features/tickets/ticketSlice'
import noteReducer from '../features/notes/notesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,  
    notes: noteReducer,
  },
});
