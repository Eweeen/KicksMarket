import { IError } from "../interfaces/error.interface";
import { IShoesFavorites } from "../interfaces/shoes.interface";
import axiosInstance from "../utils/axiosInstance";

export async function addFavorite(
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

export async function removeFavorite(
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

export async function getFavorite(
  shoes_id: string
): Promise<{ data?: boolean; error?: IError }> {
  try {
    const res = await axiosInstance.get(`/favorite/${shoes_id}`);
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
  data?: IShoesFavorites[];
  error?: IError;
}> {
  try {
    const res = await axiosInstance.get(`/favorite`);
    return { data: res.data };
  } catch (e: any) {
    return e.response;
  }
}
