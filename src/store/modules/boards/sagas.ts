import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  ICreateBoardsPayload,
  IFetchBoardsResponse,
} from "../../../api/types/boards";
import { boardsActions } from "./index";
import { BoardsKeys } from "./keys";
import { fetchApi, FetchMethods, IFetchResult } from "../api/sagas";

function* createSaga(action: PayloadAction<ICreateBoardsPayload>) {
  try {
    console.log({ action });
    const response: IFetchResult<IFetchBoardsResponse> = yield call(
      fetchApi,
      "/api/boards/create",
      {
        body: action.payload,
        method: FetchMethods.Post,
        key: BoardsKeys.create,
        callback: function* (response: IFetchResult<IFetchBoardsResponse>) {
          yield put(boardsActions.setBoards(response.body));
        },
      }
    );
  } catch {}
}

function* deleteSaga(action: PayloadAction<string>) {
  try {
    const response: IFetchResult<IFetchBoardsResponse> = yield call(
      fetchApi,
      `/api/boards/${action.payload}/delete`,
      {
        method: FetchMethods.Post,
        key: BoardsKeys.delete,
        callback: function* (response: IFetchResult<IFetchBoardsResponse>) {
          yield put(boardsActions.setBoards(response.body));
        },
      }
    );
  } catch {}
}

function* fetchSaga(action: PayloadAction<undefined>) {
  try {
    const response: IFetchResult<IFetchBoardsResponse> = yield call(
      fetchApi,
      `/api/boards/get`,
      {
        method: FetchMethods.Get,
        key: BoardsKeys.get,
        callback: function* (response: IFetchResult<IFetchBoardsResponse>) {
          yield put(boardsActions.setBoards(response.body));
        },
      }
    );
  } catch {}
}

export function* boardsSagas() {
  yield all([
    takeLatest(boardsActions.create.type, createSaga),
    takeLatest(boardsActions.delete.type, deleteSaga),
    takeLatest(boardsActions.fetch.type, fetchSaga),
  ]);
}
