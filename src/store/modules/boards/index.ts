import {
  IBoard,
  ICreateBoardsPayload,
  IFetchBoardsResponse,
} from "../../../api/types/boards";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBoardsState {
  boards?: IBoard[];
}

const initialState: IBoardsState = {};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    create(_, __: PayloadAction<ICreateBoardsPayload>) {},
    delete(_, __: PayloadAction<string>) {},
    setBoards(state, action: PayloadAction<IFetchBoardsResponse>) {
      state.boards = action.payload.boards;
    },
    fetch(_, __: PayloadAction<undefined>) {},
  },
});

export const boardsReducer = boardsSlice.reducer;
export const boardsActions = boardsSlice.actions;
