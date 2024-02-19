import React, { useState } from "react";
import css from "./SearchField.module.css";
import { getBoard } from "../../redux/api-operations";
import { useAppDispatch } from "../../redux/hooks";

const SearchField: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>(
    "780facaf-fc90-44a8-ab5d-3c5de0c88eb7"
  );

  const handleChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { value } = e.currentTarget.elements.name;
    dispatch(getBoard(value));
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Enter a board ID here..."
        value={searchQuery}
        onChange={handleChange}
        className={css.form__input}
      />
      <button type="submit" className={css.form__button}>
        Load
      </button>
    </form>
  );
};

export default SearchField;
