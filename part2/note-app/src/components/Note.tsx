import type { NoteType } from "../App";

interface NoteProps {
  note: NoteType;
  toggleImportance: (id: string) => void;
}

const Note = ({ note, toggleImportance }: NoteProps) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li>
      {note.content} <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
