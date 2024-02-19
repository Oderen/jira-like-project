import { Request, Response } from "express";
import { Task, Board } from "../schemas";
import { ctrlWrapper, HttpError } from "../helpers";

const getAll = async (_: Request, res: Response) => {
  const result = await Task.find({}, "-createdAt -updatedAt");
  res.status(200).json(result);
};

// const getById = async (req: Request, res: Response) => {
//   const id = req.params;
//   const result = await Task.findById(id);

//   if (!result) {
//     throw HttpError(404, "Not Found");
//   }

//   res.status(200).json(result);
// };

const createTask = async (req: Request, res: Response) => {
  const task = req.body;

  const result = await Task.create(req.body);

  res.status(201).json(result);
};

const updateTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await Task.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;

  const result = await Task.findByIdAndDelete(taskId);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json({ message: "contact deleted successfully ^__^" });
};

export default {
  getAll: ctrlWrapper(getAll),
  createTask: ctrlWrapper(createTask),
  updateTaskById: ctrlWrapper(updateTaskById),
  deleteTask: ctrlWrapper(deleteTask),
};
