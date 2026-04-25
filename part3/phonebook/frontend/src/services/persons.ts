import axios from "axios";
import type { NewPersonType, PersonType } from "../../../shared/types";
const baseUrl = "/api/persons";

const getAll = (): Promise<PersonType[]> => {
  return axios.get(baseUrl).then((res) => res.data);
};

const addNew = (newPerson: NewPersonType) => {
  return axios.post(baseUrl, newPerson).then((res) => res.data);
};

const remove = (id: string) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

const update = (personToUpdate: PersonType) => {
  const id = personToUpdate.id
  return axios.put(`${baseUrl}/${id}`, personToUpdate).then((res) => res.data);
};

export default { getAll, addNew, remove, update };
