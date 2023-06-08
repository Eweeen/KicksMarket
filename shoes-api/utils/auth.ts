import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function getUserId(token: string): string {
  const decodedToken = jwt.verify(token, process.env.KEY_PASSWORD!);
  if (typeof decodedToken === "string") return decodedToken;
  return decodedToken.user._id;
}
