export type ErrorType = {
  _tag: "ERROR";
  statusCode: number;
  errorType: string;
  message: string;
  errorData: undefined;
};

export const errorDto = (data: any): ErrorType => {
  if (data.errorType) return { ...data, __tag: "ERROR" } as ErrorType;
  return {
    _tag: "ERROR",
    statusCode: 500,
    errorType: "FrontEndError",
    message: "مشکلی پیش آمده است.",
    errorData: undefined,
  };
};
