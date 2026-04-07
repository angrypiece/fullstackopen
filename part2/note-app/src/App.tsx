import Note from "./components/Note";

export type NoteType = {
  id: number;
  content: string;
  important: boolean;
};

interface AppProps {
  notes: NoteType[];
}

const App = ({ notes }: AppProps) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default App;
