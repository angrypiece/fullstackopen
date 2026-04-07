import type { NoteType } from "../App";

interface NoteProps {
  note: NoteType;
}

const Note = ({ note }: NoteProps) => {
  return <div>{note.content}</div>;
};

export default Note;
