import axios, { AxiosResponse } from "axios";
import { z, ZodRawShape } from "zod";
import { errorDto, ErrorType } from "./dtos/errorDto";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export default {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
};

export const handleResponse = <A, B, O>(
  res: AxiosResponse<A, B>,
  dto: (i: any) => O
): ({ _tag: "SUCCESS" } & O) | ErrorType => {
  try {
    return { _tag: "SUCCESS", ...dto(res.data) };
  } catch {
    const error = errorDto(res.data);
    return error;
  }
};

export const validate =
  <A extends ZodRawShape>(zodObj: A) =>
  (i: any) => {
    try {
      return z.object(zodObj).strict().strip().parse(i);
    } catch {
      return errorDto({});
    }
  };
