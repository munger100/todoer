import { RootState } from "../..";

export const selectAuth = (state: RootState) => state.auth;
export const selectHasChecked = (state: RootState) =>
  selectAuth(state).hasChecked;
export const selectSignature = (state: RootState) =>
  selectAuth(state).signature;
