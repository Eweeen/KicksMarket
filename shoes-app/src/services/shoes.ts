import { IError } from "../interfaces/error.interface";
import { IShoes } from "../interfaces/shoes.interface";
import axiosInstance from "../utils/axiosInstance";

export async function getShoes(): Promise<{ data?: IShoes[]; error?: IError }> {
  try {
    const res = await axiosInstance.get(`/shoes`);

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
    return {
      error: {
        message: e.response.data.message,
        status: e.response.status,
      },
    };
  }
}
