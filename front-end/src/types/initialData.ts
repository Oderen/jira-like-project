// Board
export interface ITask {
  _id: string;
  title: string;
  content: string;
}

export interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export interface IBoard {
  boardId: string;
  boardName: string;
  tasks: Record<string, ITask>;
  columns: Record<string, IColumn>;
  columnOrder: string[];
}

export interface BoardState {
  items: IBoard[];
  isLoading: boolean;
  error: null | string;
}
