import axios from "axios";
import type { NewNote, NoteType } from "../types";
const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
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
