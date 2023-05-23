import { ISignUp } from "../interfaces/auth.interface";
import { IError } from "../interfaces/error.interface";
import axiosInstance from "../utils/axiosInstance";
import { IUser } from "../interfaces/user.interface";

export async function login(
  email: string,
  password: string
): Promise<{ data?: { token: string }; error?: IError }> {
  try {
    const res = await axiosInstance.post(`/login`, {
      email,
      password,
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

export async function signUp(
  req: ISignUp
): Promise<{ data?: IUser; error?: IError }> {
  try {
    const res = await axiosInstance.post(`/sign-up`, req);
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
