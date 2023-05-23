import { Request, Response } from "express";
import { db } from "../models";
import { getUserId } from "../utils/auth";

const Shoes = db.shoes;
const User = db.user;

export const findShoes = (req: Request, res: Response) => {
  Shoes.find({})
    .then((shoes) => {
      res.status(200).send(shoes);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

export const findShoesHome = async (req: Request, res: Response) => {
  const shoes = await Shoes.find({ hidden: false });

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

  res.json(shoesHome);
};

export const findShoesById = (req: Request, res: Response) => {
  const id = req.params.id;

  Shoes.findById(id)
    .then((shoes) => {
      if (!shoes) {
        res.status(404).send({ message: "Shoes not found" });
      }

      res.status(200).send(shoes);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

export const findAllBrands = async (req: Request, res: Response) => {
  const brands = await Shoes.distinct("brand");

  res.json(brands);
};

export const findAllByBrand = async (req: Request, res: Response) => {
  const brand = req.params.name;
  const shoes = await Shoes.find({ brand: brand });
  res.json(shoes);
};

export const addShoes = (req: Request, res: Response) => {
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
};

export const updateShoes = async (req: Request, res: Response) => {
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

  res.send("Updated successfully");
};

export const deleteShoes = async (req: Request, res: Response) => {
  await Shoes.deleteOne({ _id: req.params.id });
  res.send("Deleted successfully");
};
