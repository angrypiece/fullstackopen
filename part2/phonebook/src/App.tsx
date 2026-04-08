import React, { useState } from "react";

type Person = {
  name: string;
  number: string;
};

const App = () => {
  const [persons, setPersons] = useState<Person[]>([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newPerson, setNewPerson] = useState<Person>({
    name: "",
    number: "",
  });
  const [filter, setFilter] = useState("");

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

  const changePerson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPerson((prev) => ({ ...prev, [name]: value }));
  };

  const filteredPersons = persons.filter((person) =>
    person.name.trim().toLowerCase().includes(filter.trim().toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input
            name="name"
            type="text"
            value={newPerson.name}
            onChange={changePerson}
          />
        </div>
        <div>
          number:{" "}
          <input
            name="number"
            type="tel"
            value={newPerson.number}
            onChange={changePerson}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => {
          return (
            <li key={person.name}>
              {person.name} ({person.number})
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
