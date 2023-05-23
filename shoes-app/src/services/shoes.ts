import { IError } from "../interfaces/error.interface";
import {
  IShoes,
  IShoesFavorites,
  IShoesHome,
} from "../interfaces/shoes.interface";
import axiosInstance from "../utils/axiosInstance";

export async function getShoes(): Promise<{
  data?: IShoesHome[];
  error?: IError;
}> {
  try {
    const { data } = await axiosInstance.get(`/shoes/home`);
    const favorites = await axiosInstance.get(`/favorite`);
    const shoes = [] as IShoesHome[];

    for (const shoe of data) {
      const isFavorite = favorites.data.find(
        (favorite: any) => favorite.id === shoe._id
      );

      shoes.push({
        ...shoe,
        isFavorite: !!isFavorite,
      });
    }

    return { data: shoes };
  } catch (e: any) {
    return e.response;
  }
}

export async function getShoesById(
  id: string
): Promise<{ data?: IShoes; error?: IError }> {
  try {
    const res = await axiosInstance.get(`/shoes/${id}`);
    return { data: res.data };
  } catch (e: any) {
    return {
      error: {
        message: e.response.data.message,
        status: e.response.status,
      },
    };
  }
}

export async function getBrands(): Promise<{
  data?: string[];
  error?: IError;
}> {
  try {
    const res = await axiosInstance.get(`/brands`);
    return { data: res.data };
  } catch (e: any) {
    return e.response;
  }
}

export async function getShoesInFavorites(): Promise<{
  data?: IShoesFavorites[];
  error?: IError;
}> {
  try {
    const shoes = await axiosInstance.get(`/shoes-favorites`);

    return { data: shoes.data };
  } catch (e: any) {
    return e.response;
  }
}
