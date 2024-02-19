import React from "react";
import SearchField from "./components/SearchField";
import TaskList from "./components/TaskList";
import Modal from "./components/Modal";
import { useAppSelector } from "./redux/hooks";

const App: React.FC = () => {
  const isModalOpen = useAppSelector((state) => state.modal.isModalOpen);

  return (
    <div className="App">
      <h1 className="App__title">Taskify</h1>
      <SearchField />
      <TaskList />
      {isModalOpen && <Modal />}
    </div>
  );
};

export default App;
