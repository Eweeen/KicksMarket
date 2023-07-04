import { Request, Response } from "express";
import { db } from "../models";
import dotenv from "dotenv";
import { unlinkSync } from "fs";
import path from "path";
import { genSalt, hash } from "bcrypt";

dotenv.config();

const User = db.user;
const Shoes = db.shoes;

/* ================================================= */
/* ==================== Favoris ==================== */
/* ================================================= */

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const shoes = await Shoes.findOne({ _id: req.params.id });

    // Vérifie si la chaussure existe
    if (!shoes) {
      return res.status(404).json({ message: "Chaussure introuvable" });
    }

    const user = await User.findOne({ _id: req.params.user_id }).populate({ path: "favoris", match: { _id: shoes._id } });

    // Vérifie si le favori existe déjà
    if (user?.favoris.length !== 0) {
      return res.status(409).json({ message: "Déjà dans les favoris" });
    }
  
    // Ajoute le favori à l'utilisateur
    await User.updateOne({ _id: req.params.user_id }, { $push: { favoris: shoes._id } });
  
    res.status(200).json({ message: "Favori ajouté" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    // Vérifie si le favori existe déjà
    const user = await User.findOne({ _id: req.params.user_id }).populate({ path: "favoris", match: { _id: req.params.id } });

    if (!user?.favoris || user?.favoris.length === 0) {
      return res.status(409).json({ message: "Pas dans les favoris" });
    }

    // Supprime le favori de l'utilisateur
    await User.updateOne({ _id: req.params.user_id }, { $pull: { favoris: req.params.id } });

    res.status(200).json({ message: "Favori supprimé" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};

export const getOneFavorite = async (req: Request, res: Response) => {
  try {
    // Obtient le favori de l'utilisateur
    const user = await User.findOne({ _id: req.params.user_id }).populate({ path: "favoris", match: { _id: req.params.id } });

    if (!user?.favoris || user?.favoris.length === 0) {
      return res.status(404).json({ message: "Favori introuvable" });
    }

    res.status(200).json(user.favoris[0]);
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
    // Obtient les favoris de l'utilisateur
    const user = await User.findOne({ _id: req.params.user_id }).populate("favoris");
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    res.status(200).json(user.favoris);
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};

/* ============================================== */
/* ==================== Cart ==================== */
/* ============================================== */

export const addCart = async (req: Request, res: Response) => {
  try {
    // Vérifie si le stock est disponible
    const shoes = await Shoes.findOne({
      _id: req.params.id,
      sizes: { $elemMatch: { size: req.body.size, quantity: { $gt: 0 } } },
    });

    if (!shoes) {
      return res.status(404).json({ message: "Stock indisponible" });
    }

    // Vérifie si la chaussure est déjà dans le panier
    const user = await User.findOne({
      _id: req.params.user_id,
      "panier.size": req.body.size,
    }).populate({ path: "panier.shoes", match: { _id: req.params.id } });

    // Ajoute le panier à l'utilisateur
    if (!user) {
      const panier = {
        shoes: req.params.id,
        size: req.body.size,
        quantity: req.body.quantity,
      };

      await Promise.all([
        // Met à jour les chaussures pour décrémenter la quantité
        Shoes.updateOne(
          { _id: req.params.id, "sizes.size": req.body.size },
          { $inc: { "sizes.$.quantity": -panier.quantity } }
        ),
        // Met à jour le panier de l'utilisateur
        User.updateOne({ _id: req.params.user_id }, { $push: { panier: panier } }),
      ]);

      return res.status(200).json({ message: "Panier mis à jour" });
    }

    // Vérifie si ça n'excède pas la quantité maximale
    if (user.panier[0].quantity + req.body.quantity > 5) {
      return res.status(409).json({
        message: "Vous avez atteint la quantité maximale disponible pour cet article",
      });
    }

    // Si la chaussure est déjà dans le panier, on incrémente la quantité
    await Promise.all([
      // Met à jour les chaussures pour décrémenter la quantité
      Shoes.updateOne(
        { _id: req.params.id, "sizes.size": req.body.size },
        { $inc: { "sizes.$.quantity": -req.body.quantity } }
      ),
      // Met à jour le panier de l'utilisateur pour incrémenter la quantité
      User.updateOne(
        { _id: req.params.user_id, "panier.shoes": req.body.id },
        { $inc: { "panier.$.quantity": +req.body.quantity } }
      ),
    ]);

    return res.status(200).json({ message: "Panier mis à jour" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};

export const removeCart = async (req: Request, res: Response) => {
  // Vérifie si le panier existe déjà
  const user = await User.findOne({
    _id: req.params.user_id,
    "panier.size": req.body.size,
  }).populate({ path: "panier.shoes", match: { _id: req.params.id } });

  if (!user) {
    return res.status(404).json({ message: "Chaussures introuvable dans le panier" });
  }

  // Si la quantité à supprimer est supérieure ou égale à la quantité dans le panier
  if (user.panier[0].quantity <= req.body.quantity) {
    await Promise.all([
      // Met à jour les chaussures pour incrémenter la quantité
      Shoes.updateOne(
        { _id: req.params.id, "sizes.size": req.body.size },
        { $inc: { "sizes.$.quantity": user.panier[0].quantity } }
      ),
      // Supprimer la chaussure du panier
      User.updateOne(
        { _id: req.params.user_id, "panier.shoes": req.params.id },
        { $pull: { panier: { shoes: req.params.id } } }
      )
    ]);

    return res.status(200).json({ message: "Chaussures supprimées du panier" });
  }

  await Promise.all([
    // Met à jour les chaussures pour incrémenter la quantité
    Shoes.updateOne(
      { _id: req.params.id, "sizes.size": req.body.size },
      { $inc: { "sizes.$.quantity": req.params.quantity } }
    ),
    // Met à jour le panier de l'utilisateur
    User.updateOne(
      { _id: req.params.user_id, "panier.shoes": req.params.id },
      { $inc: { "panier.$.quantity": req.params.quantity } }
    )
  ]);

  return res.status(200).json({ message: "Chaussures supprimées du panier" });
};

export const getCart = async (req: Request, res: Response) => {
  try {
    // Obtient le panier de l'utilisateur
    const user = await User.findOne({ _id: req.params.user_id }).populate("panier.shoes");
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    res.status(200).json(user.panier);
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};

/* ============================================== */
/* ==================== User ==================== */
/* ============================================== */

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Aucun fichier téléchargé" });

    // Vérifie si l'utilisateur a déjà un avatar
    const user = await User.findOne({ _id: req.params.user_id });

    // Supprime l'ancien avatar
    if (user?.avatar) {
      unlinkSync(path.join(__dirname, `../../uploads/avatars/${user.avatar}`));
    }

    // Met à jour l'avatar de l'utilisateur
    await User.updateOne({ _id: req.params.user_id }, { avatar: req.file.filename });

    res.status(200).json({ message: "Photo de profil ajoutée" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};

export const viewAvatar = async (req: Request, res: Response) => {
  try {
    // Obtenir l'avatar de l'utilisateur
    const user = await User.findOne({ _id: req.params.user_id });
    
    if (!user?.avatar) {
      return res.status(404).json({ message: "Photo de profile de l'utilisateur introuvable" });
    }
    
    res.sendFile(path.join(__dirname, `../../uploads/avatars/${user.avatar}`));
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    // Hashage du mot de passe
    const salt = await genSalt(+process.env.BCRYPT_ROUND!);
    const hashedPassword = await hash(req.body.password, salt);

    // Mettre à jour le mot de passe de l'utilisateur
    await User.updateOne({ _id: req.params.user_id }, { password: hashedPassword });

    res.status(200).json({ message: "Mot de passe mis à jour" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Suppression de l'utilisateur
    await User.deleteOne({ _id: req.params.user_id });
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};
