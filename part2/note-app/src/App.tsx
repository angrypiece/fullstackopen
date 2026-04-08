import React, { useEffect, useState } from "react";
import Note from "./components/Note";
import type { NoteType } from "./types";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((res) => {
      setNotes(res.data);
    });
  }, []);

  const addNote = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    axios.post("http://localhost:3001/notes", noteObject).then((res) => {
      setNotes(notes.concat(res.data));
      setNewNote("");
    });
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setNewNote(e.target.value);
  };

  const toggleImportance = (id: number) => {
    const note = notes.find((n) => n.id === id);

    if (!note) return 

    const changedNote = { ...note, important: !note.important };

    axios.put(`http://localhost:3001/notes/${id}`, changedNote).then((res) => {
      setNotes(notes.map((n) => (n.id === id ? res.data : n)));
    });
  };

  const notesToShow = showAll ? notes : notes.filter((n) => n.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote} action="">
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
