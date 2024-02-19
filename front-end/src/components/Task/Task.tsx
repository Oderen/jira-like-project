import React, { useState } from "react";
import css from "./Task.module.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Draggable } from "react-beautiful-dnd";
import { ITask } from "../../types/initialData";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteTask,
  updateTask,
  updateBoard,
} from "../../redux/api-operations";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

interface TaskProps {
  task: ITask;
  index: number;
  columnId: string;
}

const Task: React.FC<TaskProps> = ({ index, task, columnId }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(task.title);
  const [content, setContent] = useState(task.content);
  const [isEditMode, setEditMode] = useState(false);
  const boardId = useAppSelector((state) => state.boards.currentBoard._id);

  const changeEditMode = () => {
    setEditMode((prevState) => !prevState);
  };

  const saveEditings = (taskId: string) => {
    const editedTask = {
      id: taskId,
      title,
      content,
    };
    dispatch(updateTask(editedTask));
    setEditMode((prevState) => !prevState);
  };

  const cancelEdit = () => {
    setTitle(task.title);
    setContent(task.content);
    setEditMode((prevState) => !prevState);
  };

  const handleTextChange = (e: any) => {
    const { value, name } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "content":
        setContent(value);
        break;
      default:
        return;
    }
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <li
          className={`${css.task__card} ${
            snapshot.isDragging ? css.dragged : ""
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            className={css.textWrapper}
            style={{ paddingBottom: isEditMode ? 28 : 0 }}
          >
            {isEditMode ? (
              <div style={{ display: "flex", alignItems: "start" }}>
                <input
                  className={css.task__editTitle}
                  type="text"
                  name="title"
                  defaultValue={title}
                  onChange={handleTextChange}
                />
              </div>
            ) : (
              <p className={css.task__title}>{title}</p>
            )}

            {isEditMode ? (
              <div style={{ display: "flex", alignItems: "start" }}>
                <input
                  className={css.task__editContent}
                  type="text"
                  name="content"
                  defaultValue={content}
                  onChange={handleTextChange}
                />
              </div>
            ) : (
              <p className={css.task__description}>{content}</p>
            )}
          </div>

          <div className={css.iconsWrapper}>
            {!isEditMode ? (
              <button
                type="button"
                className={css.task__button}
                onClick={changeEditMode}
              >
                <FaRegEdit className={css.task__icon} />
              </button>
            ) : (
              <div style={{ display: "flex", gap: 3 }}>
                <button>
                  <FaCheck
                    className={css.task__icon}
                    onClick={() => saveEditings(task._id)}
                  />
                </button>
                <button>
                  <AiOutlineClose
                    className={css.task__icon}
                    onClick={cancelEdit}
                  />
                </button>
              </div>
            )}
            <button
              type="button"
              className={css.task__button}
              onClick={() => {
                dispatch(deleteTask(task._id));
                dispatch(
                  updateBoard({
                    taskId: task._id,
                    boardId,
                    columnId,
                  })
                );
              }}
            >
              <RiDeleteBin6Line className={css.task__icon} />
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
