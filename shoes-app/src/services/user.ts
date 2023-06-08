import { IError } from "../interfaces/error.interface";
import { IShoes, IShoesCart } from "../interfaces/shoes.interface";
import axiosInstance from "../utils/axiosInstance";

export async function addToFavorite(
  id: string
): Promise<{ data?: boolean; error?: IError }> {
  try {
    const res = await axiosInstance.post(`/favorite/${id}`);
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

export async function removeToFavorite(
  id: string
): Promise<{ data?: boolean; error?: IError }> {
  try {
    const res = await axiosInstance.delete(`/favorite/${id}`);
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

export async function getFavorites(): Promise<{
  data?: IShoes[];
  error?: IError;
}> {
  try {
    const res = await axiosInstance.get(`/favorite`);
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

export async function addToCart(
  id: string,
  quantity: number,
  size: number
): Promise<{ data?: IShoesCart; error?: IError }> {
  try {
    const res = await axiosInstance.post(`/cart/${id}`, {
      quantity,
      size,
    });

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

export async function getCart(): Promise<{
  data?: IShoesCart[];
  error?: IError;
}> {
  try {
    const res = await axiosInstance.get(`/cart`);
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

export async function deleteUser(id: string): Promise<{
  data?: string;
  error?: IError;
}> {
  try {
    const res = await axiosInstance.delete(`/user/${id}`);
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
