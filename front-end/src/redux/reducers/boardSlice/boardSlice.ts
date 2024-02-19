import { createSlice } from "@reduxjs/toolkit";
import {
  getBoard,
  createBoard,
  deleteBoard,
  updateTaskOrder,
  updateBoard,
  updateBoardOnTaskCreate,
} from "../../api-operations";
import initialState from "./initialState";

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentBoard = payload;
      })
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBoard.rejected, (state, { payload }) => {
        if (typeof payload === "string") {
          state.error = payload;
        }
      })
      .addCase(createBoard.fulfilled, (state, { payload }) => {
        state.items = [...state.items, payload];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBoard.rejected, (state, { payload }) => {
        if (typeof payload === "string") {
          state.error = payload;
        }
      })
      .addCase(deleteBoard.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item.boardId !== payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateTaskOrder.fulfilled, (state, { payload }) => {
        state.currentBoard = payload;
      })
      .addCase(updateBoard.fulfilled, (state, { payload }) => {
        state.currentBoard = payload;
      })
      .addCase(updateBoardOnTaskCreate.fulfilled, (state, { payload }) => {
        state.currentBoard.columns = payload;
      });
  },
});

export default boardsSlice.reducer;
