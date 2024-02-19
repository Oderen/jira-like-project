import React, { MouseEventHandler, useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleModal } from "../../redux/reducers/modalSlice/modalSlice";
import {
  createTask,
  updateBoardOnTaskCreate,
} from "../../redux/api-operations";
import { v4 as uuidv4 } from "uuid";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

interface Props {
  columdId?: string;
}

const Modal: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector(
    (state: any) => state.boards.currentBoard._id
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      dispatch(toggleModal(false));
    }
  };

  const handleBackdropClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget === e.target) {
      dispatch(toggleModal(false));
    }
  };

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const task = {
      _id: uuidv4(),
      title: formData.get("title"),
      content: formData.get("content"),
      boardId: currentBoardId,
    };

    dispatch(createTask(task));
    // TODO
    // 1. Create task
    // 2. При видаленні проблема "Cannot read properties of undefined (reading '_id')"

    // @ts-ignore
    dispatch(updateBoardOnTaskCreate(task));
    dispatch(toggleModal(false));
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          type="button"
          className={css.modal__button}
          onClick={() => dispatch(toggleModal(false))}
        >
          <AiOutlineClose className={css.modal__icon} />
        </button>
        <p className={css.modal__title}>Modal Title</p>
        <form className={css.form} onSubmit={onHandleSubmit}>
          <label htmlFor="title" className={css.form__label}>
            <span className={css.form__labelText}>Title:</span>
            <input className={css.from__input} type="text" name="title" />
          </label>
          <label htmlFor="content" className={css.form__label}>
            <span className={css.form__labelText}>Content:</span>
            <input type="text" name="content" className={css.from__input} />
          </label>
          <button type="submit" className={css.form__button}>
            Create
          </button>
        </form>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
