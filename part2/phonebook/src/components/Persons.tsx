import type { Person } from "../types";

interface PersonsProps {
  filteredPersons: Person[];
}

const Persons = ({ filteredPersons }: PersonsProps) => {
  return (
    <div>
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

export default Persons;
