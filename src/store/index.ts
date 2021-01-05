import { all } from "@redux-saga/core/effects";
import { configureStore, createStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import { boardsReducer } from "./modules/boards";
import { apiReducer } from "./modules/api";
import { boardsSagas } from "./modules/boards/sagas";

const rootReducer = combineReducers({
  boards: boardsReducer,
  api: apiReducer,
});

function* rootSaga() {
  yield all([boardsSagas()]);
}

export default function setupStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    preloadedState: initialState,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

export type RootState = ReturnType<typeof rootReducer>;
