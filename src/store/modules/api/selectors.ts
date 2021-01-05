import type { RootState } from "../..";

export const selectApi = (state: RootState) => state.api;

export const selectAllLoading = (state: RootState) => selectApi(state).loading;

export const getIsLoadingSelector = (key: string) => (state: RootState) =>
  selectAllLoading(state).includes(key);

export const getIsLoadingHistorySelector = (key: string) => (
  state: RootState
) => selectApi(state).loadingHistory.includes(key);

export const getErrorsSelector = (key: string) => (state: RootState) =>
  selectApi(state).errors[key];
