const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://anton:${password}@noteapp.r9jhnnq.mongodb.net/noteApp?appName=noteapp`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

Note.find({}).then((res) => {
  res.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});

// const note = new Note({
//   content: "HTML is easy",
//   important: true,
// });

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });
