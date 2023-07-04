import { Schema, model } from "mongoose";

const panierSchema = new Schema({
  shoes: { type: Schema.Types.ObjectId, ref: "Shoes", required: true },
  size: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const schema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  birthdate: { type: Date, required: true },
  avatar: { type: String, required: false },
  role: { type: String, required: true },
  panier: [panierSchema],
  favoris: [{ type: Schema.Types.ObjectId, ref: "Shoes" }],
});

schema.index({ email: 1 });

export const User = model("Users", schema);
