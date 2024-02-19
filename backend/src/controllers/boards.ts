import { Request, Response } from "express";
import { Board } from "../schemas";
import { ctrlWrapper, HttpError } from "../helpers";

const getAll = async (_: Request, res: Response) => {
  const result = await Board.find({}, "-createdAt -updatedAt");
  res.status(200).json(result);
};

const getBySearch = async (req: Request, res: Response) => {
  const { query } = req.query;
  const result = await Board.findOne({ _id: query });

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(result);
};

const createBoard = async (req: Request, res: Response) => {
  const result = await Board.create(req.body);
  res.status(201).json(result);
};

const updateBoardById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await Board.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const updateBoardonTaskCreate = async (req: Request, res: Response) => {
  const boardId = req.params.id;
  const taskId = req.body._id;

  const result = await Board.findByIdAndUpdate(
    {
      _id: boardId,
    },
    {
      $addToSet: { [`columns.Todo.taskIds`]: taskId },
    },
    { new: true }
  );

  // @ts-ignore
  res.status(201).json(result.columns);
};

const updateBoardTaskOrder = async (req: Request, res: Response) => {
  const { _id } = req.body;

  const result = await Board.findByIdAndUpdate({ _id }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const deleteTaskIds = async (req: Request, res: Response) => {
  const boardId = req.params.id;
  const { taskId, columnId } = req.body;

  const result = await Board.findOneAndUpdate(
    {
      _id: boardId,
    },
    {
      $pull: { [`columns.${columnId}.taskIds`]: taskId },
    },
    { new: true }
  );

  return res.json(result);
};

const deleteBoard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Board.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json({ message: "contact deleted successfully ^__^" });
};

export default {
  getAllBoards: ctrlWrapper(getAll),
  getBySearch: ctrlWrapper(getBySearch),
  createBoard: ctrlWrapper(createBoard),
  updateBoardById: ctrlWrapper(updateBoardById),
  updateBoardTaskOrder: ctrlWrapper(updateBoardTaskOrder),
  updateBoardonTaskCreate: ctrlWrapper(updateBoardonTaskCreate),
  deleteBoard: ctrlWrapper(deleteBoard),
  deleteTaskIds: ctrlWrapper(deleteTaskIds),
};
