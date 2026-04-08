import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import type { Person } from "./types";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newPerson, setNewPerson] = useState<Person>({
    name: "",
    number: "",
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  const addPerson = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameExists = persons.some(
      (p) =>
        p.name.toLowerCase().trim() === newPerson.name.toLowerCase().trim(),
    );

    if (nameExists) {
      alert(`${newPerson.name} already exists in phonebook!`);
      return;
    }

    setPersons((prev) => prev.concat(newPerson));
    setNewPerson({ name: "", number: "" });
  };

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPerson((prev) => ({ ...prev, [name]: value }));
  };

  const filteredPersons = persons.filter((person) =>
    person.name.trim().toLowerCase().includes(filter.trim().toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)} />
      <h3>add a new</h3>
      <PersonForm
        onChange={handlePersonChange}
        onSubmit={addPerson}
        newPerson={newPerson}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
