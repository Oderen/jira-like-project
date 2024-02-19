import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers";
import Joi from "joi";

const boardSchema = new Schema(
  {
    _id: {
      type: String,
      required: [true, "_id is required field"],
    },
    name: {
      type: String,
      required: [true, "name is required field"],
    },
    columns: {
      type: {
        Todo: {
          id: String,
          title: String,
          taskIds: [Object],
        },
        InProgress: {
          id: String,
          title: String,
          taskIds: [Object],
        },
        Done: {
          id: String,
          title: String,
          taskIds: [Object],
        },
      },
      required: [true, "columns is required field"],
      autoIndex: false,
      _id: false,
    },
    columnOrder: {
      type: [String],
      required: [true, "columnOrder is required field"],
    },
  },
  { versionKey: false }
);

boardSchema.post("save", handleMongooseError);

export const Board = model("board", boardSchema);

export const addBoardSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  columns: Joi.object({
    Todo: Joi.object({
      id: Joi.string(),
      title: Joi.string(),
      taskIds: Joi.array().items(Joi.object()),
    }),
    InProgress: Joi.object({
      id: Joi.string(),
      title: Joi.string(),
      taskIds: Joi.array().items(Joi.object()),
    }),
    Done: Joi.object({
      id: Joi.string(),
      title: Joi.string(),
      taskIds: Joi.array().items(Joi.object()),
    }),
  }).required(),
  columnOrder: Joi.array().items(Joi.string()).required(),
});

export const updateTaskOrderSchema = Joi.object({
  Todo: Joi.object({
    id: Joi.string(),
    title: Joi.string(),
    taskIds: Joi.array().items(Joi.string()),
  }).required(),
  InProgress: Joi.object({
    id: Joi.string(),
    title: Joi.string(),
    taskIds: Joi.array().items(Joi.string()),
  }).required(),
  Done: Joi.object({
    id: Joi.string(),
    title: Joi.string(),
    taskIds: Joi.array().items(Joi.string()),
  }).required(),
  _id: Joi.string(),
});
