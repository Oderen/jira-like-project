import express from "express";
import {
  getAll,
  createTask,
  updateTaskById,
  deleteTask,
} from "../../controllers";
import { validateBody, isValidId } from "../../middlewares";
import { addSchema } from "../../schemas";

export const taskRouter = express.Router();

taskRouter.get("/", getAll);
taskRouter.post("/", validateBody(addSchema), createTask);
taskRouter.put("/:id", updateTaskById);
taskRouter.delete("/:id", deleteTask);

// isValidId, validateBody(addSchema),
// isValidId
