import "dotenv/config";
import express, { type Request } from "express";
const app = express();
import morgan from "morgan";
import { errorHandler, unknownEndpoint } from "./middleware/index";
import type { PersonType } from "../../shared/types";
import Person from "./modules/person";

app.use(express.static("dist"));
app.use(express.json());

morgan.token("body", (req: Request) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] bytes :response-time ms :body",
  ),
);

app.get("/api/info", async (_req, res) => {
  const persons = await Person.find({});
  res.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `);
});

app.get("/api/persons", async (_req, res) => {
  const persons = await Person.find({});
  res.json(persons);
});

app.get("/api/persons/:id", async (req, res) => {
  const id = req.params.id;
  const person = await Person.findById({ id });

  res.json(person);
});

app.delete("/api/persons/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const person = await Person.deleteOne({ _id: id });
    res.status(204).end();
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error);
    }
  }
});

app.post("/api/persons", async (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(500).send({ error: "missing name and/or number" });
  }

  const persons = await Person.find({});

  const nameExists = persons
    .map((p: PersonType) => p.name.toLowerCase())
    .includes(name.toLowerCase().trim());

  if (nameExists) {
    return res.status(500).send({ error: "name must be unique!" });
  }

  const id = String(Math.max(...persons.map((p) => Number(p.id))) + 1);

  const newPerson = await Person.insertOne({ id, name, number });

  res.json(newPerson);
});

app.put("/api/persons/:id", async (req, res) => {
  const { name, number } = req.body;

  const person = await Person.findById(req.params.id);

  if (!person) return res.status(404).end();

  const updatedPerson = await Person.findOneAndUpdate(
    person,
    { name, number },
    { runValidators: true },
  );
  console.log(updatedPerson)
  res.json(updatedPerson);
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
