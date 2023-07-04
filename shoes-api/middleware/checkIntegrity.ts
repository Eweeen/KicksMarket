import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const checkIntegrity = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token non valide" });
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY_PASSWORD!);

    if (typeof decoded === "string") {
      return res.status(401).json({ message: "L'authentification a échoué" });
    }

    // TODO: autoriser si l'utilisateur est admin
    if (decoded.user.role === "admin") {
      next();
      return;
    }

    if (decoded.user._id !== req.params.user_id) {
      return res.status(401).json({ message: "Vous n'êtes pas autorisé à accéder à un contenu qui n'est pas le votre" });
    }

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expiré" });
      return;
    }

    res.status(401).json({ message: "Échec de l'authentification de l'utilisateur" });
  }
}