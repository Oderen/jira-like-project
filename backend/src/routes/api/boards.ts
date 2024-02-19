import express from "express";
import {
  getAllBoards,
  getBySearch,
  createBoard,
  updateBoardById,
  updateBoardTaskOrder,
  deleteBoard,
  deleteTaskIds,
  updateBoardonTaskCreate,
} from "../../controllers";
import { validateBody, isValidId } from "../../middlewares";
import { addBoardSchema, updateTaskOrderSchema } from "../../schemas";

export const boardRouter = express();

boardRouter.get("/", getAllBoards);
boardRouter.get("/search", getBySearch);
boardRouter.post("/", validateBody(addBoardSchema), createBoard);
boardRouter.put(
  "/:id",
  isValidId,
  validateBody(addBoardSchema),
  updateBoardById
);
boardRouter.patch(
  "/taskOrder",
  // isValidId,
  // validateBody(updateTaskOrderSchema),
  updateBoardTaskOrder
);
boardRouter.delete("/:id", isValidId, deleteBoard);
boardRouter.patch("/:id", deleteTaskIds);
boardRouter.patch("/newTask/:id", updateBoardonTaskCreate);
