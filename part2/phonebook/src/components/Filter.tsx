import type React from "react";

interface FilterProps {
  filter: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filter = ({ filter, onChange }: FilterProps) => {
  return (
    <div>
      <input type="text" value={filter} onChange={onChange} />
    </div>
  );
};

export default Filter;
