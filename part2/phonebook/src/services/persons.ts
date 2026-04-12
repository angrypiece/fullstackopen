import axios from "axios";
import type { NewPerson, Person } from "../types";
const baseUrl = "http://localhost:3001/persons";

const getAll = (): Promise<Person[]> => {
  return axios.get(baseUrl).then((res) => res.data);
};

const addNew = (newPerson: NewPerson) => {
  return axios.post(baseUrl, newPerson).then((res) => res.data);
};

const remove = (id: string) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

const update = (personToUpdate: Person) => {
  const id = personToUpdate.id
  return axios.put(`${baseUrl}/${id}`, personToUpdate).then((res) => res.data);
};

export default { getAll, addNew, remove, update };
