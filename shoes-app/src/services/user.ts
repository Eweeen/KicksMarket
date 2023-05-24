import { IError } from "../interfaces/error.interface";
import { IShoes } from "../interfaces/shoes.interface";
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
