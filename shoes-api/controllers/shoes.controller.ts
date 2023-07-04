import { Request, Response } from "express";
import { db } from "../models";

const Shoes = db.shoes;

export const findShoes = async (req: Request, res: Response) => {
  try {
    // Recherche des chaussures disponibles
    const shoes = await Shoes.find({ hidden: false });
    
    // Vérification si des chaussures ont été trouvées
    if (!shoes) {
      res.status(404).json({ message: "Chaussures non trouvées" });
    }

    res.status(200).json(shoes);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const findShoesHome = async (req: Request, res: Response) => {
  try {
    // Recherche des chaussures disponibles
    const shoes = await Shoes.find({ hidden: false });

    // Transformation des chaussures pour la page d'accueil
    const shoesHome = shoes.map((shoe) => {
      return {
        _id: shoe._id,
        name: shoe.name,
        price: shoe.price,
        brand: shoe.brand,
        image: shoe.image,
        isFavorite: false,
      };
    });

    res.status(200).json(shoesHome);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const findShoesById = async (req: Request, res: Response) => {
  try {
    // Recherche des chaussures par ID
    const shoes = await Shoes.find({ _id: req.params.id });
    
    // Vérification si les chaussures existent
    if (!shoes) {
      res.status(404).json({ message: "Chaussures non trouvées" });
    }

    res.status(200).json(shoes);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const findAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await Shoes.distinct("brand");
    res.status(200).json(brands);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const findAllByBrand = async (req: Request, res: Response) => {
  try {
    const shoes = await Shoes.find({ brand: req.params.name });
    res.status(200).json(shoes);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const addShoes = (req: Request, res: Response) => {
  try {
    const shoes = new Shoes({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      brand: req.body.brand,
      hidden: req.body.hidden,
      image: req.body.image,
      sizes: req.body.sizes,
    });
    
    shoes.save();
    res.status(200).send(shoes);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const updateShoes = async (req: Request, res: Response) => {
  try {
    // Mettre à jour les informations des chaussures
    await Shoes.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          brand: req.body.brand,
          hidden: req.body.hidden,
          image: req.body.image,
          sizes: req.body.sizes,
        },
      }
    );
      
    res.status(200).send({ message: "Mise à jour de la chaussure réussie" });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteShoes = async (req: Request, res: Response) => {
  try {
    // Supprimer une paire de chaussures
    await Shoes.deleteOne({ _id: req.params.id });
    res.status(200).send({ message: "Suppression réussie" });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};
