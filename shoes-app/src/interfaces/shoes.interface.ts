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

export interface IShoesCart {
  _id: string;
  shoes: IShoes;
  quantity: number;
  size: number;
}
