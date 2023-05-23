import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */

export const authorize =
  (allowedAccessTypes: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.KEY_PASSWORD!);

      if (typeof decoded === "string") {
        return res.status(401).json({ message: "Authentification failed" });
      }

      const hasAccessToEndpoint = allowedAccessTypes.includes(
        decoded.user.role
      );

      if (!hasAccessToEndpoint) {
        return res
          .status(401)
          .json({ message: "No enough privileges to access endpoint" });
      }

      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Expired token" });
        return;
      }

      res.status(401).json({ message: "Failed to authenticate user" });
    }
  };
