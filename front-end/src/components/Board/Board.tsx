// @ts-nocheck
import React, { useState } from "react";
import css from "./Board.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "../Column";
import { updateTaskOrder, createBoard } from "../../redux/api-operations";
import { FaPlus } from "react-icons/fa";

const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.boards.currentBoard);
  const fetchedTasks = useAppSelector((state) => state.tasks.items);

  const handleDragAndDrop = ({
    destination,
    source,
    draggableId,
  }: DropResult) => {
    if (!board) {
      return;
    }
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const startColumn = board.columns[source.droppableId];
    const finishColumn = board.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTasksIds = Array.from(startColumn.taskIds);

      newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTasksIds,
      };

      const newBoard = {
        ...board,
        columns: {
          ...board.columns,
          [newColumn.id]: newColumn,
        },
      };

      dispatch(updateTaskOrder(newBoard));
      return;
    }

    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    const newBoard = {
      ...board,
      columns: {
        ...board.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };
    dispatch(updateTaskOrder(newBoard));
  };

  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <div className={css.smth}>
        <h2>{board.name}</h2>
        <p>
          {" "}
          <span style={{ fontWeight: 600, color: "white", marginRight: 10 }}>
            ID:
          </span>
          {board._id}
        </p>

        <div style={{ display: "flex", width: "100%" }}>
          {board &&
            board.columnOrder.map((columnId) => {
              const column = board.columns[columnId];
              const tasks = column.taskIds.map((taskId) => {
                return fetchedTasks.find((task) => task._id === taskId);
              });
              return (
                <Column
                  key={columnId}
                  column={column}
                  tasks={tasks}
                  columnId={columnId}
                />
              );
            })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
