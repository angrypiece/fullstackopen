import React, { useEffect, useState } from "react";
import Note from "./components/Note";
import type { ErrorMessage, NewNote, NoteType } from "./types";
import noteService from "./services/notes.js";
import Notification from "./components/Notification.js";
import Footer from "./components/Footer.js";

const App = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(null);

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes: NoteType[]) => setNotes(initialNotes));
  }, []);

  const addNote = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newNoteObject: NewNote = {
      content: newNote,
      // eslint-disable-next-line react-hooks/purity
      important: Math.random() > 0.5,
    };

    noteService.create(newNoteObject).then((addedNote: NoteType) => {
      setNotes(notes.concat(addedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setNewNote(e.target.value);
  };

  const toggleImportance = (id: string) => {
    const note = notes.find((n) => n.id === id);

    if (!note) return;

    const changedNote: NoteType = { ...note, important: !note.important };

    noteService
      .update(changedNote.id, changedNote)
      .then((updatedNote: NoteType) => {
        setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setErrorMessage(
            `Note "${note.content}" was already removed from server`,
          );

          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);

          setNotes(notes.filter((n) => n.id !== id));
        }
      });
  };

  const notesToShow = showAll ? notes : notes.filter((n) => n.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
      <Footer />
    </div>
  );
};

export default App;
