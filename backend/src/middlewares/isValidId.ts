import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers";
import { Request, Response, NextFunction } from "express";
import { Board } from "../schemas";

export const isValidId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (typeof id === "string") {
    const isValidId = await Board.findById(id);
    if (!isValidId) {
      next(HttpError(404, `${id} is not valid id`));
    }
  } else {
    if (!isValidObjectId(id)) {
      next(HttpError(404, `${id} is not valid id`));
    }
  }

  next();
};
