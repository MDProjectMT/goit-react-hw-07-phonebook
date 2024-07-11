import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../slices/contacts.slice';
import filterReducer from '../slices/filter.slice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});
