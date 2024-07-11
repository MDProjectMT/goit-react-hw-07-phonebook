import ContactForm from '../components/ContactForm/ContactForm';
import Filter from '../components/Filter/Filter';
import ContactList from '../components/ContactList/ContactList';
import { useEffect } from 'react';
import { setFilter } from '../redux/slices/filter.slice';
import {
  addContact,
  deleteContact,
  setContact,
} from '../redux/slices/contacts.slice.js';
import { useDispatch, useSelector } from 'react-redux';

export default function ContactsBook() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    const addContact = localStorage.getItem('contacts');
    if (addContact) {
      dispatch(setContact(JSON.parse(addContact)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function handleChange(ev) {
    dispatch(setFilter(ev.currentTarget.value));
  }

  function handleSubmit(name, number) {
    const filtered = contacts.filter(
      (item) =>
        item.name.toLowerCase() === name.toLowerCase() && item.number === number
    );

    if (filtered.length > 0) {
      window.alert(JSON.stringify(`${name} is already in contacts`));
      return;
    }
    dispatch(addContact({ name, number }));
  }

  // function handleDelete(id) {
  //   dispatch(deleteContact(id));
  // }

  return (
    <div>
      <h2 style={{ marginLeft: '30px' }}>Phonebook</h2>
      <ContactForm onSubmit={handleSubmit} />
      <h2 style={{ margin: '30px 0 0 30px' }}>Contacts</h2>
      <Filter filter={filter} onChange={handleChange} />
      <ContactList
        filter={filter}
        contacts={contacts}
        onDelete={(id) => dispatch(deleteContact(id))}
      />
    </div>
  );
}
