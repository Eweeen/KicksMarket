import mongoose from "mongoose";
import { Shoes } from "./shoes.model";
import { User } from "./users.model";
mongoose.Promise = global.Promise;

export const db = {
  mongoose: mongoose,
  shoes: Shoes,
  user: User,
};
