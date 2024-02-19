import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./reducers/boardSlice";
import taskSlice from "./reducers/taskSlice/taskSlice";
import modalSlice from "./reducers/modalSlice/modalSlice";

export const store = configureStore({
  reducer: {
    boards: boardsSlice,
    tasks: taskSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
