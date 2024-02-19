import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// interface INewBoard {
//   id: string;
//   name: string;
// }

interface ITask {
  id?: string;
  title: FormDataEntryValue | null | string;
  content: FormDataEntryValue | null | string;
  boardId: string;
}

// interface Task {
//   id: string;
// }

// interface Column {
//   id: string;
//   title: string;
//   taskIds: string[];
// }

// interface Board {
//   boardId: string;
//   columns: Record<string, Column>;
// }

const BE_URL = "http://localhost:7070/api";

export const getBoards = createAsyncThunk(
  "boards/getAll",
  // TODO Типізувати data
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BE_URL}/boards`);

      return data;
    } catch (err: any) {
      console.log("Error: ==> ", err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const getBoard = createAsyncThunk(
  "boards/getOne",
  // TODO Типізувати data
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:7070/api/boards/search",
        {
          params: { query },
        }
      );

      return data;
    } catch (err: any) {
      console.log("Error: ==> ", err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const createBoard = createAsyncThunk(
  "boards/create",
  // TODO Типізувати data
  async (data, { rejectWithValue }) => {
    try {
      const newBoard = {
        _id: uuidv4(),
        name: "Board-1",
        columns: {
          Todo: {
            id: "Todo",
            title: "To do",
            taskIds: ["65a290ec36961736ad5277ac", "65a290ec36961736ad5277ae"],
          },
          InProgress: {
            id: "InProgress",
            title: "In Progress",
            taskIds: [],
          },
          Done: {
            id: "Done",
            title: "Done",
            taskIds: [],
          },
        },
        columnOrder: ["Todo", "InProgress", "Done"],
      };

      const fetchedNewBoard = await axios.post(`${BE_URL}/boards`, newBoard);
      console.log("fetchedNewBoard", fetchedNewBoard);

      return {};
    } catch (err: any) {
      console.log("Error: ==> ", err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const deleteBoard = createAsyncThunk<string, string>(
  "boards/delete",
  async (boardId, { rejectWithValue }) => {
    try {
      return boardId;
    } catch (err: any) {
      console.log("Error: ==> ", err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const updateBoard = createAsyncThunk<string, string>(
  "boards/update",
  // TODO Типізувати data
  async (inputData, { rejectWithValue }) => {
    const { taskId, boardId, columnId } = inputData;
    try {
      const { data } = await axios.patch(`${BE_URL}/boards/${boardId}`, {
        taskId,
        columnId,
      });
      return data;
    } catch (err: any) {
      console.log("Error: ==> ", err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const updateBoardOnTaskCreate = createAsyncThunk<string, string>(
  "boards/updateOnTaskCreate",
  // TODO Типізувати data
  async (task, { rejectWithValue }) => {
    const { _id, boardId } = task;
    try {
      const { data } = await axios.patch(
        `${BE_URL}/boards/newTask/${boardId}`,
        {
          _id,
        }
      );
      return data;
    } catch (err: any) {
      console.log("Error: ==> ", err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const updateTaskOrder = createAsyncThunk(
  "boards/updateTaskOrder",
  // TODO Типізувати data
  async (newBoard, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${BE_URL}/boards/taskOrder`,
        newBoard
      );
      return data;
    } catch (err: any) {
      console.log("Error: ==> ", err);
      return rejectWithValue(err.message);
    }
  }
);

export const getTasks = createAsyncThunk(
  "tasks/getAll",
  // TODO Типізувати data
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BE_URL}/tasks`);

      return data;
    } catch (err: any) {
      console.log("Error: ==> ", err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/create",
  // TODO Типізувати data
  async (task: ITask, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BE_URL}/tasks`, task);

      return data;
    } catch (err: any) {
      console.log("Error: ==> ", err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const deleteTask = createAsyncThunk<string, string>(
  "tasks/delete",
  async (taskId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BE_URL}/tasks/${taskId}`);

      return taskId;
    } catch (err: any) {
      console.log("Error: ==> ", err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const updateTask = createAsyncThunk<
  ITask,
  string,
  { rejectValue: { error: string } }
>("tasks/update", async (newTask, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${BE_URL}/tasks/${newTask.id}`, newTask);
    console.log("data", data);
    return data;
  } catch (err: any) {
    console.log("Error: ==> ", err.message);
    return rejectWithValue({ error: err.message });
  }
});
