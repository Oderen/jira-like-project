import tasks from "./tasks";
import boards from "./boards";

export const getAll = tasks.getAll;
export const createTask = tasks.createTask;
export const updateTaskById = tasks.updateTaskById;
export const deleteTask = tasks.deleteTask;

export const getAllBoards = boards.getAllBoards;
export const getBySearch = boards.getBySearch;
export const createBoard = boards.createBoard;
export const updateBoardById = boards.updateBoardById;
export const updateBoardTaskOrder = boards.updateBoardTaskOrder;
export const deleteBoard = boards.deleteBoard;
export const deleteTaskIds = boards.deleteTaskIds;
export const updateBoardonTaskCreate = boards.updateBoardonTaskCreate;
