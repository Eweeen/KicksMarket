export interface IShoes {
  _id: string;
  name: string;
  description?: string;
  price: number;
  brand: string;
  hidden: boolean;
  image: string;
  sizes: ISizes[];
}

export interface ISizes {
  size: number;
  quantity: number;
}

export interface IShoesHome {
  _id: string;
  name: string;
  price: number;
  brand: string;
  image: string;
  isFavorite: boolean;
}

export interface IShoesFavorites {
  _id: string;
  name: string;
  price: number;
  brand: string;
  image: string;
  soldOut: boolean;
}
