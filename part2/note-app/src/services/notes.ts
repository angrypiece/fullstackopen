import axios from "axios";
import type { NewNote, NoteType } from "../types";
const baseUrl = "/api/notes";

const getAll = () => {
  const nonExisting: NoteType = {
    id: "10000",
    content: "This note is not saved to server",
    important: true,
  };
  return axios.get(baseUrl).then((res) => res.data.concat(nonExisting));
};

const create = (newNote: NewNote) => {
  return axios.post(baseUrl, newNote).then((res) => res.data);
};

const update = (id: string, updatedNote: NoteType) => {
  return axios.put(`${baseUrl}/${id}`, updatedNote).then((res) => res.data);
};

export default {
  getAll,
  create,
  update,
};
