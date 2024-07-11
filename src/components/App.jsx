import ContactsBook from '../pages/ContactsBook';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/goit-react-hw-06-phonebook/" element={<ContactsBook />} />
      </Routes>
    </BrowserRouter>
  );
};
