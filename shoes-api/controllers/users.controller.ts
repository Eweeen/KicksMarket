import { Request, Response } from "express";
import { db } from "../models";
import { getUserId } from "../utils/auth";

const User = db.user;
const Shoes = db.shoes;

/* ================================================= */
/* ==================== Favoris ==================== */
/* ================================================= */

export const addFavorite = async (req: Request, res: Response) => {
  // Get user id from token
  const user_id = getUserId(req.headers.authorization?.split(" ")[1]!);

  // Check if favorite already exist
  const user = await User.findOne({
    _id: user_id,
  }).populate({ path: "favoris", match: { _id: req.params.id } });

  if (user?.favoris.length !== 0) {
    return res.status(409).json({ message: "Already on favorite" });
  }

  // Add favorite to user
  await User.updateOne({ _id: user_id }, { $push: { favoris: req.params.id } });

  res.status(200).send(true);
};

export const removeFavorite = async (req: Request, res: Response) => {
  // Get user id from token
  const user_id = getUserId(req.headers.authorization?.split(" ")[1]!);

  // Check if favorite already exist
  const user = await User.findOne({
    _id: user_id,
  }).populate({ path: "favoris", match: { _id: req.params.id } });

  if (user?.favoris === undefined || user?.favoris.length === 0) {
    return res.status(409).json({ message: "Not on favorite" });
  }

  // Remove favorite to user
  await User.updateOne({ _id: user_id }, { $pull: { favoris: req.params.id } });

  res.status(200).json({ message: "Favorite removed" });
};

export const getOneFavorite = async (req: Request, res: Response) => {
  // Get user id from token
  const user_id = getUserId(req.headers.authorization?.split(" ")[1]!);

  // Get user favorite
  const user = await User.findOne({
    _id: user_id,
  }).populate({ path: "favoris", match: { _id: req.params.id } });

  if (user?.favoris === undefined || user?.favoris.length === 0) {
    return res.status(404).json({ message: "Favoris not found" });
  }

  res.status(200).json(user?.favoris[0]);
};

export const getFavorites = async (req: Request, res: Response) => {
  // Get user id from token
  const user_id = getUserId(req.headers.authorization?.split(" ")[1]!);

  // Get user favorites
  const user = await User.findOne({ _id: user_id }).populate("favoris");

  res.status(200).json(user?.favoris);
};

/* ============================================== */
/* ==================== Cart ==================== */
/* ============================================== */

export const addCart = async (req: Request, res: Response) => {
  // Get user id from token
  const user_id = getUserId(req.headers.authorization?.split(" ")[1]!);

  // Check if stock available
  const shoes = await Shoes.findOne({
    _id: req.params.id,
    sizes: {
      $elemMatch: {
        size: req.body.size,
        quantity: { $gt: 0 },
      },
    },
  });

  if (!shoes) {
    return res.status(404).json({ message: "Aucun stock disponible" });
  }

  // Check if cart already exist
  const user = await User.findOne({
    _id: user_id,
    "panier.size": req.body.size,
  }).populate({ path: "panier.shoes", match: { _id: req.params.id } });

  // Add cart to user
  if (!user) {
    const panier = {
      shoes: req.params.id,
      size: req.body.size,
      quantity: req.body.quantity,
    };

    // Update shoes to decrement quantity
    await Shoes.updateOne(
      { _id: req.params.id, "sizes.size": req.body.size },
      { $inc: { "sizes.$.quantity": -panier.quantity } }
    );
    // Update cart to user
    await User.updateOne({ _id: user_id }, { $push: { panier: panier } });

    return res.status(200).send(true);
  }

  if (user.panier[0].quantity + +req.body.quantity > 5) {
    return res.status(409).json({
      message:
        "Vous avez atteint la quantité maximale disponible pour cet article",
    });
  }

  // Update shoes to decrement quantity
  await Shoes.updateOne(
    { _id: req.params.id, "sizes.size": req.body.size },
    { $inc: { "sizes.$.quantity": -req.body.quantity } }
  );
  // Update cart to user in increment quantity
  await User.updateOne(
    { _id: user_id, "panier.shoes": req.params.id },
    { $inc: { "panier.$.quantity": +req.body.quantity } }
  );

  return res.status(200).send(true);
};

// TODO: compléter la fonction
export const removeCart = async (req: Request, res: Response) => {
  // Get user id from token
  const user_id = getUserId(req.headers.authorization?.split(" ")[1]!);

  // Check if cart already exist
  const user = await User.findOne({
    _id: user_id,
    "panier.size": req.body.size,
  }).populate({ path: "panier.shoes", match: { _id: req.params.id } });

  if (!user) {
    return res.status(404).json({ message: "Cart not found" });
  }

  // Update cart to user
  await User.updateOne(
    { _id: user_id, "panier.shoes": req.params.id },
    {
      $inc: {
        "panier.$.quantity": -1,
      },
    }
  );

  return res.status(200).send(true);
};

export const getCart = async (req: Request, res: Response) => {
  // Get user id from token
  const user_id = getUserId(req.headers.authorization?.split(" ")[1]!);

  // Get user cart
  const user = await User.findOne({ _id: user_id }).populate("panier.shoes");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user.panier);
};
