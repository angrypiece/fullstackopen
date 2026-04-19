const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("you must enter a password");
}

const password = process.argv[2];
const url = `mongodb+srv://anton:${password}@cluster0.rjj0snf.mongodb.net/?appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const number = process.argv[4];
  Person.create({ name, number }).then((result) => {
    console.log(result);
    mongoose.connection.close();
  });
}
