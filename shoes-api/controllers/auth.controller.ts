import { Request, Response } from "express";
import { hash, genSalt, compare } from "bcrypt";
import { db } from "../models";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const User = db.user;

export const signUp = async (req: Request, res: Response) => {
  if (!process.env.BCRYPT_ROUND) throw new Error("BCRYPT_ROUND is not defined");
  const salt = await genSalt(parseInt(process.env.BCRYPT_ROUND));
  const password = await hash(req.body.password, salt);

  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: password,
    birthdate: new Date(req.body.birthdate),
    role: "user",
    panier: [],
    favoris: [],
  });

  user.save();
  res.status(200).send(user);
};

export const login = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(401).send({ message: "Email ou mot de passe incorrect" });
    return;
  }

  const samePassword = await compare(req.body.password, user.password);
  if (!samePassword) {
    res.status(401).send({ message: "Email ou mot de passe incorrect" });
    return;
  }

  const token = jwt.sign({ user }, process.env.KEY_PASSWORD!, {
    expiresIn: "1h",
  });
  res.status(200).json({ token: token });
};
