interface ErrorMessageList {
  400: string;
  401: string;
  403: string;
  404: string;
  409: string;
}

type HttpStatusCode = keyof ErrorMessageList;

const errorMessageList: ErrorMessageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

export const HttpError = (status: HttpStatusCode, message: any) => {
  console.log("message", message);
  const error = new Error(message) as any;
  error.status = status;
  return error;
};
