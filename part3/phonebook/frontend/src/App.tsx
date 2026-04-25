import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import {
  type NotificationMessage,
  type NewPersonType,
  type PersonType,
} from "../../shared/types";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState<PersonType[]>([]);
  const [newPerson, setNewPerson] = useState<NewPersonType>({
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

    const existingPerson = persons.find(
      (persons) =>
        persons.name.trim().toLowerCase() ===
        newPerson.name.trim().toLowerCase(),
    );

    if (
      existingPerson &&
      confirm(
        `${existingPerson.name} already exists in phonebook. Do you want to update?`,
      )
    ) {
      updatePerson(existingPerson);
      return;
    }

    const newPersonObject = {
      name: newPerson.name,
      number: newPerson.number,
    };

    personService
      .addNew(newPersonObject)
      .then((addedPerson) => {
        setPersons((prev) => prev.concat(addedPerson));
        displayNotification(`${addedPerson.name} added`);
        setNewPerson({ name: "", number: "" });
      })
      .catch((error: unknown) => {
        // @ts-expect-error
        displayNotification(error.response.data.error, true);
      });
  };

  const updatePerson = (personToUpdate: PersonType) => {
    const updatedPersonObject = { ...personToUpdate, number: newPerson.number };

    personService
      .update(updatedPersonObject)
      .then((updatedPerson: PersonType) => {
        console.log(updatedPerson)
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
        displayNotification(`${updatePerson.name} has been updated`);
      });
  };

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name" || name === "number") {
      setNewPerson((prev: NewPersonType) => ({ ...prev, [name]: value }));
    }
  };

  const handlePersonDelete = (id: string) => {
    const personToDelete = persons.find((p) => p.id === id);

    if (!personToDelete) return;

    if (window.confirm(`Delete ${personToDelete.name}?`) && personToDelete) {
      personService
        .remove(personToDelete.id)
        .then(() => {
          setPersons(
            persons.filter((oldPerson) => oldPerson.id !== personToDelete.id),
          );
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            displayNotification(
              `${personToDelete.name} has already been deleted from server`,
              true,
            );
            setPersons(
              persons.filter((person) => person.id !== personToDelete.id),
            );
          }
        });
    }
  };

  const displayNotification = (message: string, error = false) => {
    if (error) {
      setNotificationMessage({
        error,
        message,
      });
    } else {
      setNotificationMessage({ message, error });
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
