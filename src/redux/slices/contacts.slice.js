import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  deleteContact,
  addContact,
} from '../operations/operations.js';

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

// "tasks/fetchContacts/pending" - początek zapytania
// "tasks/fetchContacts/fulfilled" - pomyślne zakończenie zapytania
// "tasks/fetchContacts/rejected" - zakończenie zapytania z błędem

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => ({
        ...state,
        contacts: [...state.contacts, action.payload],
      }))
      .addCase(addContact.rejected, (state, action) => ({
        ...state,
        error: action.payload,
      }))
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default contactsSlice.reducer;

// Przykładowa tablica obiektów:
// { id: '001', name: 'John Wolf', number: '123-45-67' },
// { id: '002', name: 'Jane Alter', number: '234-56-78' },
// { id: '003', name: 'Alice Olfer', number: '345-67-89' },
// { id: '004', name: 'Julia Winter', number: '234-56-55' },
// { id: '005', name: 'Ann Clinton', number: '345-67-14' },

//     addContact(state, action) {
//       return [
//         ...state,
//         {
//           id: nanoid(),
//           name: action.payload.name,
//           number: action.payload.number,
//         },
//       ];
//     },
//     deleteContact(state, action) {
//       return state.filter((contact) => contact.id !== action.payload);
//     },
//     setContact(state, action) {
//       return action.payload;
//     },
//   },
// });

// reducers: {
//     fetchingInProgres(state) {
//       state.loading = true;
//     },
//     fetchingSuccess(state, action) {
//       state.loading = false;
//       state.error = null;
//       state.name = action.payload;
//       state.number = action.payload;
//     },
//     fetchingError(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },

// export const { fetchingInProgres, fetchingSuccess, fetchingError } =
//   contactsSlice.actions;
