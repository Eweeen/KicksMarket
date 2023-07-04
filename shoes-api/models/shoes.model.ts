import { Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  hidden: { type: Boolean, default: true },
  image: { type: String, required: true },
  sizes: [
    {
      size: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

export const Shoes = model("Shoes", schema);
