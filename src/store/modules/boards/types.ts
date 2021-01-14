export interface IBoardAction {
  boardId: string;
}

export interface ICreateBoardAction extends IBoardAction {
  name: string;
  color?: string;
}

export interface IEditBoardAction extends IBoardAction {
  name?: string;
  color?: string;
}

export interface ITaskAction {
  boardId: string;
  taskId: string;
}

export interface IEditTaskAction extends ITaskAction {
  label: string;
}
