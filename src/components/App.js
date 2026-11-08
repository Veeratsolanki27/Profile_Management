import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

const uuid = () => (window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : Math.random().toString(36).substring(2, 15));

function App() {
  const [contacts, setContacts] = useState([]);

  //RetrieveContacts
  const retrieveContacts = async () => {
    try {
      const response = await api.get("/contacts");
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return [];
    }
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };

    try {
      const response = await api.post("/contacts", request);
      if (response && response.data) {
        setContacts((prev) => [...prev, response.data]);
      } else {
        setContacts((prev) => [...prev, request]);
      }
    } catch (error) {
      console.warn("API post warning:", error);
      setContacts((prev) => [...prev, request]);
    }
  };

  const updateContactHandler = async (contact) => {
    try {
      const response = await api.put(`/contacts/${contact.id}`, contact);
      const updatedData = (response && response.data) ? response.data : contact;
      setContacts((prev) =>
        prev.map((c) => (String(c.id) === String(contact.id) ? { ...updatedData } : c))
      );
    } catch (error) {
      console.warn("API update warning:", error);
      setContacts((prev) =>
        prev.map((c) => (String(c.id) === String(contact.id) ? { ...contact } : c))
      );
    }
  };

  const removeContactHandler = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
    } catch (error) {
      console.warn("API delete warning (item deleted locally):", error);
    }
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => String(contact.id) !== String(id))
    );
  };

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllCOntacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllCOntacts();
  }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <Router>
        <Header totalContacts={contacts.length} />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />

          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />

          <Route path="/contact/:id" component={ContactDetail} />   
        </Switch>
      </Router>
    </div>
  );
}

export default App;
