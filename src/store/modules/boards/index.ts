import {
  IBoard,
  ICreateBoardsPayload,
  IEditBoardsPayload,
  IFetchBoardsResponse,
} from "../../../api/types/boards";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICreateTaskPayload } from "../../../api/types/tasks";
import { IEditTaskAction, ITaskAction } from "./types";

interface IBoardsState {
  activeBoards: {
    [id: string]: IBoard;
  };
}

const initialState: IBoardsState = {
  activeBoards: {},
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    create(_, __: PayloadAction<ICreateBoardsPayload>) {},
    delete(_, __: PayloadAction<string>) {},
    setBoards(state, action: PayloadAction<IFetchBoardsResponse>) {
      state.activeBoards = action.payload.boards.reduce((boards, board) => {
        return {
          ...boards,
          [board.id]: {
            ...board,
          },
        };
      }, {});
    },
    fetch(_, __: PayloadAction<undefined>) {},
    edit(_, __: PayloadAction<IEditBoardsPayload>) {},
    createTask(_, __: PayloadAction<ICreateTaskPayload>) {},
    editTask(_, __: PayloadAction<IEditTaskAction>) {},
    toggleTaskCompleted(_, __: PayloadAction<ITaskAction>) {},
    deleteTask(_, __: PayloadAction<ITaskAction>) {},
  },
});

export const boardsReducer = boardsSlice.reducer;
export const boardsActions = boardsSlice.actions;
