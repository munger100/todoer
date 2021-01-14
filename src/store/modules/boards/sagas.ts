import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  ICreateBoardsPayload,
  IEditBoardsPayload,
  IFetchBoardsResponse,
} from "../../../api/types/boards";
import { boardsActions } from "./index";
import { BoardsKeys } from "./keys";
import { fetchApi, FetchMethods, IFetchResult } from "../api/sagas";
import { ICreateTaskPayload } from "../../../api/types/tasks";
import { IEditTaskAction, ITaskAction } from "./types";

function* createSaga(action: PayloadAction<ICreateBoardsPayload>) {
  try {
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

function* editSaga(action: PayloadAction<IEditBoardsPayload>) {
  try {
    const response: IFetchResult<IFetchBoardsResponse> = yield call(
      fetchApi,
      `/api/boards/${action.payload.id}/edit`,
      {
        body: action.payload,
        method: FetchMethods.Post,
        key: BoardsKeys.edit,
        callback: function* (response: IFetchResult<IFetchBoardsResponse>) {
          yield put(boardsActions.setBoards(response.body));
        },
      }
    );
  } catch {}
}

function* createTaskSaga(action: PayloadAction<ICreateTaskPayload>) {
  try {
    const response: IFetchResult<IFetchBoardsResponse> = yield call(
      fetchApi,
      `/api/boards/${action.payload.id}/tasks/create`,
      {
        body: action.payload,
        method: FetchMethods.Post,
        key: BoardsKeys.createTask,
        callback: function* (response: IFetchResult<IFetchBoardsResponse>) {
          yield put(boardsActions.setBoards(response.body));
        },
      }
    );
  } catch {}
}

function* editTaskSaga(action: PayloadAction<IEditTaskAction>) {
  try {
    const response: IFetchResult<IFetchBoardsResponse> = yield call(
      fetchApi,
      `/api/boards/${action.payload.boardId}/tasks/${action.payload.taskId}/edit`,
      {
        body: action.payload,
        method: FetchMethods.Post,
        key: BoardsKeys.editTask,
        callback: function* (response: IFetchResult<IFetchBoardsResponse>) {
          yield put(boardsActions.setBoards(response.body));
        },
      }
    );
  } catch {}
}

function* toggleTaskCompletedSaga(action: PayloadAction<ITaskAction>) {
  try {
    const response: IFetchResult<IFetchBoardsResponse> = yield call(
      fetchApi,
      `/api/boards/${action.payload.boardId}/tasks/${action.payload.taskId}/toggle`,
      {
        method: FetchMethods.Post,
        key: BoardsKeys.toggleTaskCompleted,
        callback: function* (response: IFetchResult<IFetchBoardsResponse>) {
          yield put(boardsActions.setBoards(response.body));
        },
      }
    );
  } catch {}
}

function* deleteTaskSaga(action: PayloadAction<ITaskAction>) {
  try {
    console.log("delete");
    const response: IFetchResult<IFetchBoardsResponse> = yield call(
      fetchApi,
      `/api/boards/${action.payload.boardId}/tasks/${action.payload.taskId}/delete`,
      {
        method: FetchMethods.Post,
        key: BoardsKeys.deleteTask,
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
    takeLatest(boardsActions.edit.type, editSaga),
    takeLatest(boardsActions.createTask.type, createTaskSaga),
    takeLatest(boardsActions.toggleTaskCompleted.type, toggleTaskCompletedSaga),
    takeLatest(boardsActions.editTask.type, editTaskSaga),
    takeLatest(boardsActions.deleteTask.type, deleteTaskSaga),
  ]);
}
