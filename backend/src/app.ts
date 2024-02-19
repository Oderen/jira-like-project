import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { boardRouter } from "./routes/api/boards";
import { taskRouter } from "./routes/api/tasks";

export const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/boards", boardRouter);
app.use("/api/tasks", taskRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});
