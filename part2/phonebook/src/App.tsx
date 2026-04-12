import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import { type NotificationMessage, type NewPerson, type Person } from "./types";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newPerson, setNewPerson] = useState<NewPerson>({
    name: "",
    number: "",
  });
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] =
    useState<NotificationMessage | null>(null);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const addPerson = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foundPerson = persons.find(
      (persons) =>
        persons.name.trim().toLowerCase() ===
        newPerson.name.trim().toLowerCase(),
    );

    if (foundPerson) {
      const isConfirmed = confirm(
        `${foundPerson.name} already exists in phonebook! Do you want to update`,
      );
      if (isConfirmed) {
        updatePerson(foundPerson);
        displayNotification(foundPerson);
        return;
      }
    }

    const newPersonObject = {
      name: newPerson.name,
      number: newPerson.number,
    };

    personService.addNew(newPersonObject).then((addedPerson) => {
      setPersons((prev) => prev.concat(addedPerson));
      displayNotification(addedPerson);
      setNewPerson({ name: "", number: "" });
    });
  };

  const updatePerson = (personToUpdate: Person) => {
    const updatedPersonObject = { ...personToUpdate, number: newPerson.number };

    personService.update(updatedPersonObject).then((updatedPerson: Person) => {
      setPersons(
        persons.map((person) => {
          if (person.id === updatedPerson.id) {
            return updatedPerson;
          } else {
            return person;
          }
        }),
      );
      setNewPerson({ name: "", number: "" });
    });
  };

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name" || name === "number") {
      setNewPerson((prev: NewPerson) => ({ ...prev, [name]: value }));
    }
  };

  const handlePersonDelete = (id: string) => {
    const personToDelete = persons.find((p) => p.id === id);
    if (!personToDelete) return;
    const confirm = window.confirm(`Delete ${personToDelete.name})`);
    if (confirm && personToDelete) {
      personService
        .remove(personToDelete.id)
        .then((deletedPerson: Person) => {
          setPersons(
            persons.filter((oldPerson) => oldPerson.id !== deletedPerson.id),
          );
        })
        .catch((error) => {
          if (error instanceof Error) {
            displayNotification(personToDelete, true);
            setPersons(
              persons.filter((person) => person.id !== personToDelete.id),
            );
          }
        });
    }
  };

  const displayNotification = (person: Person, error = false) => {
    if (error) {
      setNotificationMessage({
        message: `Information of "${person.name}" has already been removed from server`,
        error: true,
      });
    } else {
      setNotificationMessage({
        message: `Person "${person.name}" was added or updated`,
      });
    }
    setTimeout(() => {
      setNotificationMessage({ message: "" });
    }, 5000);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.trim().toLowerCase().includes(filter.trim().toLowerCase()),
  );

  return (
    <div>
      <Notification notification={notificationMessage} />
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)} />

      <h3>add a new</h3>
      <PersonForm
        onChange={handlePersonChange}
        onSubmit={addPerson}
        newPerson={newPerson}
      />

      <h3>Numbers</h3>
      <Persons
        filteredPersons={filteredPersons}
        onDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
