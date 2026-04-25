import type { PersonType } from "../../../shared/types";

interface PersonsProps {
  filteredPersons: PersonType[];
  onDelete: (id: string) => void;
}

const Persons = ({ filteredPersons, onDelete }: PersonsProps) => {
  return (
    <div>
      <ul>
        {filteredPersons.map((person) => {
          return (
            <li key={person.name}>
              {person.name} ({person.number})
              <button onClick={() => onDelete(person.id)}>delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Persons;
