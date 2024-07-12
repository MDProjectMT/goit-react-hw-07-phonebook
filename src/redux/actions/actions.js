import { createAction } from '@reduxjs/toolkit';

export const fetchContact = createAction('contacts/fetchContact');

export const addContact = createAction('contacts/addContact');

export const deleteContact = createAction('delete/deleteContact');

export const setContact = createAction('set/setContact');

export const setFilter = createAction('filters/setFilter');
