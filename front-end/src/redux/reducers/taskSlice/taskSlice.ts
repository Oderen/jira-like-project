import { createSlice, current } from "@reduxjs/toolkit";
import {
  getTasks,
  createTask,
  // deleteTask,
  updateTask,
} from "../../api-operations";
import initialState from "../boardSlice/initialState";

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTask.rejected, (state, { payload }) => {
        if (typeof payload === "string") {
          state.error = payload;
        }
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.items = [...state.items, payload];
        state.isLoading = false;
        state.error = null;
      })
      // .addCase(deleteTask.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(deleteTask.rejected, (state, { payload }) => {
      //   if (typeof payload === "string") {
      //     state.error = payload;
      //   }
      // })
      // .addCase(deleteTask.fulfilled, (state, { payload }) => {
      //   const result = [...state.items].filter((item) => item._id !== payload);
      //   console.log("result", result);

      //   state.items = result;
      //   state.isLoading = false;
      //   state.error = null;
      // })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, { payload }) => {
        if (typeof payload === "string") {
          state.error = payload;
        }
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        const oldTaskIdx = current(state).items.findIndex(
          (item) => item._id === payload._id
        );

        state.items[oldTaskIdx] = payload;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default taskSlice.reducer;
