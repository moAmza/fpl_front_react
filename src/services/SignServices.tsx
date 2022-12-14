import http, { handleResponse, validate } from "./http";
import axios, { AxiosError } from "axios";
import {
  ErrorData,
  ServiceError,
  ServiceErrorInterface,
  ServiceSuccess,
  ServiceSuccessInterface,
} from "./Services";
import { z } from "zod";
import { ErrorType } from "./dtos/errorDto";

const USER_PREFIX = "/auth/";
const SIGNUP_URL = USER_PREFIX + "signup";
const LOGIN_URL = USER_PREFIX + "login";
export const TOKEN_SESSION_NAME = "footballFantasyToken";
export const EMAIL_SESSION = "FPLEmail";
export const IMAGE_URL = "user/image";
const CONFIRM_URL = USER_PREFIX + "confirmation";

interface InRegisterType {
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  username: string;
  password: string;
  birthday: Date;
}

type OutRegisterType = { code: string; count: number };

interface LoginData {
  username: string;
  password: string;
}

interface ConfirmData {
  code: number;
  email: string | null;
}

type Data<A> = { _tag: "SUCCESS" } & A;

export const postSignupData = async (
  signupData: InRegisterType
): Promise<ErrorType | Data<OutRegisterType>> => {
  return handleResponse(
    await http.post(SIGNUP_URL, signupData),
    validate({
      code: z.string(),
      count: z.number(),
    })
  );
};

export const postLoginData: (
  loginData: LoginData
) => Promise<ServiceSuccessInterface<string> | ServiceErrorInterface> = async (
  loginData: LoginData
) => {
  try {
    const response = await http.post(LOGIN_URL, loginData);
    const token = response.data.token;
    localStorage.setItem(TOKEN_SESSION_NAME, token);
    return ServiceSuccess<string>(response.data);
  } catch (err) {
    const _err = err as AxiosError;
    const data = _err.response?.data as ErrorData;
    console.log("hereinlogindata:", data);
    return ServiceError("username password", "اطلاعات ورودی اشتباه است");
  }
};

export const confirmSignup = async (
  confirmData: ConfirmData,
  imageData: File
) => {
  try {
    const response = await http.post(CONFIRM_URL, confirmData);
    const token = response.data.token;
    localStorage.setItem(TOKEN_SESSION_NAME, token);
    localStorage.removeItem(EMAIL_SESSION);
    const formData = new FormData();
    console.log("service image:", imageData);

    formData.append("image", imageData);
    try {
      await http.put(IMAGE_URL, formData, {
        headers: {
          Authorization: `Abdol ${localStorage.getItem(TOKEN_SESSION_NAME)}`,
        },
      });
    } catch (err) {
      console.log("error image!");
    }
    return ServiceSuccess<string>(response.data);
  } catch (err) {
    const _err = err as AxiosError;
    const data = _err.response?.data as ErrorData;
    console.log("authdata: ", data);
    return ServiceError("verificationCode", "کد وارد شده اشتباه است");
  }
};
