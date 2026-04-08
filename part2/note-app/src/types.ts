export type NoteType = {
  content: string;
  id: string;
  important: boolean;
};

export type NewNote = Omit<NoteType, "id">;
