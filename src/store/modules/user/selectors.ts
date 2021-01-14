import { RootState } from "../..";

export const selectUserState = (state: RootState) => state.user;
export const selectHasSession = (state: RootState) =>
  !!selectUserState(state).session;
export const selectSession = (state: RootState) =>
  selectUserState(state).session;
export const selectUser = (state: RootState) => selectSession(state).user;
