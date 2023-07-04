import { Request, Response } from "express";
import { hash, genSalt, compare } from "bcrypt";
import { db } from "../models";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { send } from "../email/mailer";

dotenv.config();

const User = db.user;

export const signUp = async (req: Request, res: Response) => {
  const salt = await genSalt(+process.env.BCRYPT_ROUND!);
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

  // Envoi d'un email de confirmation
  send({
    from: "kicksmarket@gmail.com",
    to: user.email,
    subject: "Inscription réussie !",
    text: "Votre compte sur KicksMarket a bien été créé !",
  });

  res.status(201).json(user);
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

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.body.token;
  if (!token) {
    res.status(401).send({ message: "Token manquant" });
    return;
  }

  jwt.verify(
    token,
    process.env.KEY_PASSWORD!,
    (err: any, decodedToken: any) => {
      if (err) {
        res.status(401).send({ message: "Token invalide" });
        return;
      }

      const user = decodedToken.user;
      const newToken = jwt.sign({ user }, process.env.KEY_PASSWORD!, {
        expiresIn: "1h",
      });
      res.status(200).json({ token: newToken });
    }
  );
};
