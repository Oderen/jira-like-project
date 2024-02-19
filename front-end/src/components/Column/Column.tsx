import React from "react";
import css from "./Column.module.css";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task";
import { IColumn, ITask } from "../../types/initialData";
import { FaPlus } from "react-icons/fa";
import { toggleModal } from "../../redux/reducers/modalSlice/modalSlice";
import { useAppDispatch } from "../../redux/hooks";
// import Modal from "../Modal";

interface ColumnProps {
  column: IColumn;
  tasks: ITask[];
  columnId: string;
}

const Column: React.FC<ColumnProps> = ({ column, tasks, columnId }) => {
  const dispatch = useAppDispatch();
  // const isModalOpen = useAppSelector((state) => state.modal.isModalOpen);
  const shouldRenderCreateBlock = column.title === "To do";

  const openModal = () => {
    dispatch(toggleModal(true));
  };

  return (
    <div className={css.column}>
      <h2 className={css.column_title}>{column.title}</h2>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${css.column__content} ${
              snapshot.isDraggingOver ? css.dragged : ""
            }`}
          >
            <ul className={css.task}>
              {tasks.map((task, index) => {
                return (
                  <Task
                    key={task._id}
                    columnId={columnId}
                    task={task}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </ul>
            {shouldRenderCreateBlock && (
              <div className={css.task__card} onClick={openModal}>
                <FaPlus className={css.task__icon} />
              </div>
            )}
          </div>
        )}
      </Droppable>
      {/* {isModalOpen && <Modal />} */}
    </div>
  );
};

export default Column;
