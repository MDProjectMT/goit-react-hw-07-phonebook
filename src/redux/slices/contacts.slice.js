import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action) {
      return [
        ...state,
        {
          id: nanoid(),
          name: action.payload.name,
          number: action.payload.number,
        },
      ];
    },
    deleteContact(state, action) {
      return state.filter((contact) => contact.id !== action.payload);
    },
    setContact(state, action) {
      return action.payload;
    },
  },
});

export const { addContact, deleteContact, setContact } = contactsSlice.actions;
export default contactsSlice.reducer;

// Przykładowa tablica obiektów:
// { id: '001', name: 'John Wolf', number: '123-45-67' },
// { id: '002', name: 'Jane Alter', number: '234-56-78' },
// { id: '003', name: 'Alice Olfer', number: '345-67-89' },
// { id: '004', name: 'Julia Winter', number: '234-56-55' },
// { id: '005', name: 'Ann Clinton', number: '345-67-14' },
