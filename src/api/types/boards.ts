import { ITask } from "./tasks";

export interface IBoard {
  id: string;
  name: string;
  color?: string;
  tasks?: ITask[];
}

export interface ICreateBoardsPayload {
  name: string;
  color?: string;
}

export interface IEditBoardsPayload {
  id: string;
  name?: string;
  color?: string;
  tasks?: ITask[];
}

export interface IFetchBoardsResponse {
  boards: IBoard[];
}
