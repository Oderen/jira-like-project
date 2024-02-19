import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers";
import Joi from "joi";

const taskSchema = new Schema(
  {
    _id: {
      type: String,
      required: [true, "_id is required field"],
    },
    title: {
      type: String,
      required: [true, "title is required field"],
    },
    content: {
      type: String,
      required: [true, "content is required field"],
    },
  },
  { versionKey: false }
);

taskSchema.post("save", handleMongooseError);

export const Task = model("task", taskSchema);

export const addSchema = Joi.object({
  _id: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  boardId: Joi.string(),
});
