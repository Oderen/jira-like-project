import React, { useEffect } from "react";
import { getTasks } from "../../redux/api-operations";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Board from "../Board";
import css from "./TaskList.module.css";

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.tasks.isLoading);
  const fetchedBoard = useAppSelector((state) => state.boards.currentBoard);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className={css.tasksWrapper}>
      {!fetchedBoard ? (
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 100,
            width: 200,
          }}
        >
          No Board
        </div>
      ) : (
        <Board />
      )}
    </div>
  );
};

export default TaskList;
