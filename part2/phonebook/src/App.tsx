import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameExists = persons
      .map((p) => p.name.toLowerCase())
      .includes(newName.toLowerCase());

    if (nameExists) {
      alert(`${newName} already exists in phonebook!`)
      return
    }

    setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input type="text" value={newName} onChange={changeName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
          return <li>{person.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
