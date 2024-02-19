import NativeError from "mongoose";

interface MongooseError extends NativeError {
  status: number;
}

export const handleMongooseError = (
  error: MongooseError,
  data: any,
  next: () => void
) => {
  error.status = 400;
  next();
};
