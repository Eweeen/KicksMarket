export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: Date;
  role: "admin" | "user";
  panier: string[];
  favoris: string[];
}

export interface IDecodedToken {
  user: IUser;
  exp: number;
  iat: number;
}
