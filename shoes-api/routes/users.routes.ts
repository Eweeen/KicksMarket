import { Express } from "express";
import * as controller from "../controllers/users.controller";
import { authorize } from "../middleware/authenticate";

export default function (app: Express) {
  // Favorite
  app.post(
    "/favorite/:id",
    authorize(["user", "admin"]),
    controller.addFavorite
  );
  app.delete(
    "/favorite/:id",
    authorize(["user", "admin"]),
    controller.removeFavorite
  );
  app.get(
    "/favorite/:id",
    authorize(["user", "admin"]),
    controller.getOneFavorite
  );
  app.get("/favorite", authorize(["user", "admin"]), controller.getFavorites);
  // Cart
  app.post("/cart/:id", authorize(["user", "admin"]), controller.addCart);
  app.delete("/cart/:id", authorize(["user", "admin"]), controller.removeCart);
  app.get("/cart", authorize(["user", "admin"]), controller.getCart);
  // User
  app.delete("/user/:id", authorize(["user", "admin"]), controller.deleteUser);
}
