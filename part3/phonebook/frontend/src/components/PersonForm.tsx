import type React from "react";
import type { NewPerson } from "../types";

interface PersonFormProps {
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement, Element>) => void;
  newPerson: NewPerson;
}

const PersonForm = ({
  onSubmit,
  onChange,
  newPerson,
}: PersonFormProps): React.JSX.Element => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{" "}
        <input
          name="name"
          type="text"
          value={newPerson.name}
          onChange={onChange}
        />
      </div>
      <div>
        number:{" "}
        <input
          name="number"
          type="tel"
          value={newPerson.number}
          onChange={onChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
