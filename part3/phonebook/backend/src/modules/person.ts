import type { PersonType } from "../../../shared/types.ts";
import mongoose, { model, Schema } from "mongoose";

mongoose.set("strictQuery", false);

const url = process.env.MONGO_URI;

if (!url) throw new Error("MONGO_URI is not defined");

console.log("Connecting to DB...");
mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log("DB Ready!");
  })
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.log("Error connecting to DB", err);
    }
  });

type PersonDocument = PersonType & {
  _id?: mongoose.Types.ObjectId;
  __v?: number;
};

const personSchema = new Schema<PersonDocument>({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /\d{2}-\d{7}|\d{3}-\d{6}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
});

personSchema.set("toJSON", {
  transform: (_doc, ret: PersonDocument & { id?: string }) => {
    ret.id = ret._id!.toString();
    delete ret._id;
    delete ret.__v;
  },
});

const Person = model<PersonDocument>("Person", personSchema);

export default Person;
