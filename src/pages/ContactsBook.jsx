import ContactForm from '../components/ContactForm/ContactForm';
import Filter from '../components/Filter/Filter';
import ContactList from '../components/ContactList/ContactList';
import { useEffect } from 'react';
import { setFilter } from '../redux/slices/filter.slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContacts,
  deleteContact,
  addContact,
} from '../redux/operations/operations';
import {
  selectContacts,
  selectError,
  selectLoading,
} from '../redux/selectors/selectors';

export default function ContactsBook() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const contacts = useSelector(selectContacts);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    const storedContact = localStorage.getItem('contacts');
    if (storedContact) {
      dispatch(fetchContacts(JSON.parse(storedContact)));
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

  function handleDelete(id) {
    dispatch(deleteContact(id));
  }

  return (
    <div>
      <h2 style={{ marginLeft: '30px' }}>Phonebook</h2>
      <ContactForm onSubmit={handleSubmit} />
      <h2 style={{ margin: '30px 0 0 30px' }}>Contacts</h2>
      <Filter filter={filter} onChange={handleChange} />
      <ContactList
        filter={filter}
        contacts={contacts}
        onDelete={handleDelete}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
