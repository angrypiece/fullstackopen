import type { NoteType } from "../types";

interface NoteProps {
  note: NoteType;
  toggleImportance: (id: string) => void;
}

const Note = ({ note, toggleImportance }: NoteProps) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      {note.content}{" "}
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
    </li>
  );
};

export default Note;
