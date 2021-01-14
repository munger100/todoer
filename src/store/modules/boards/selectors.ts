import type { RootState } from "../..";

export const selectBoardsState = (state: RootState) => state.boards;

export const selectActiveBoards = (state: RootState) =>
  selectBoardsState(state).activeBoards;

// @ts-ignore
export const selectBoards = (state: RootState) =>
  Object.values(selectActiveBoards(state));
