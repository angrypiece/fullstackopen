const express = require("express");
const app = express();

app.use(express.json());

app.get("/info", (req, res) => {
  const phoneBookLength = persons.length;
  const dateNow = new Date();
  const infoHtml = `
  <p>Phonebook has info for ${phoneBookLength} people</p>
  <p>${dateNow}</p>
  `;
  res.send(infoHtml);
});

// API

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);

  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(500).send({ error: "name or number missing" });
  }

  const nameExists = persons
    .map((p) => p.name.toLowerCase())
    .includes(name.toLowerCase().trim());

  if (nameExists) {
    return res.status(500).send({ error: "name must be unique" });
  }

  const id = String(Math.max(...persons.map((p) => Number(p.id))) + 1);

  const newPerson = { id, name, number };

  persons.push(newPerson);

  res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
