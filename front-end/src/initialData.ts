// import { IBoard } from "./types/initialData";

const initialData = [
  {
    boardId: "board-1",
    boardName: "Home Tasks",
    columns: {
      Todo: {
        id: "Todo",
        title: "To do",
        taskIds: ["65a290ec36961736ad5277ac", "65a290ec36961736ad5277ad"],
      },
      InProgress: {
        id: "InProgress",
        title: "In Progress",
        taskIds: [],
      },
      Done: {
        id: "Done",
        title: "Done",
        taskIds: [],
      },
    },
    columnOrder: ["Todo", "InProgress", "Done"],
  },
];

export default initialData;
