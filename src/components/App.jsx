import { useState  } from 'react';
import { nanoid } from 'nanoid'

import { ContactForm } from "components/ContactForm/ContactForm";
import { Filter } from "components/Filter/Filter";
import { ContactList } from "components/ContactList/ContactList";

import  defaultContact  from "defaultContact.json";

 
export  function App() {
  const [contacts, setContacts] = useState(defaultContact);
  const [filter, setFilter] = useState('');

const handleAddContact = ({ name, number }) => {
   
		const names = contacts.map(contact => contact.name);
		if (names.indexOf(name) >= 0) {
			alert(name + " is already in contacts.");
			return;
		}
  setContacts(prevContacts => (
      [{ name, number, id: nanoid() }, ...prevContacts]
  ));
  
	};

const handleDelete = idx => {
  setContacts(prevContacts => (
     prevContacts.filter(contact => contact.id !== idx)
  ))
	};

  const handleFilter = (value) => {
    setFilter(value);
   };
   
const handleContacts = () => {
		const normalizedFilter = filter.toLowerCase();

     return contacts.filter(contact =>
       contact.name.toLowerCase().includes(normalizedFilter)
     );
	};

  return (
   <>
         <div>
   <h1>Phonebook</h1>
           <ContactForm onSubmit={handleAddContact} />

   <h2>Contacts</h2>
           <Filter handleFilter={handleFilter} handleContacts={handleContacts} /> 
           <ContactList contacts={handleContacts()} handleDelete={ handleDelete} />
         </div>
      </>
        
  )
}
