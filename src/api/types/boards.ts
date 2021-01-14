import { Task, Board } from "@prisma/client";

export interface IBoard {
  id: string;
  name: string;
  color?: string;
  tasks?: Task[];
}

export interface ICreateBoardsPayload {
  name: string;
  color?: string;
}

export interface IEditBoardsPayload {
  id: string;
  name?: string;
  color?: string;
}

export interface IFetchBoardsResponse {
  boards: Board[];
}
