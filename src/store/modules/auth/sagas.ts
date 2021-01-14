import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-named-as-default
import Router from "next/router";
import {
  IAuthenticationResponse,
  ILoginPayload,
  IWhoamiResponse,
} from "../../../api/types/auth";
import { apiActions } from "../api";
import { fetchApi, FetchMethods, IFetchResult } from "../api/sagas";
import { ISession, userActions } from "../user";
import { ApiAuthKeys } from "./keys";
import { authActions } from ".";

function* loginSaga(action: PayloadAction<ILoginPayload>) {
  try {
    const response: IFetchResult<IAuthenticationResponse> = yield call(
      fetchApi,
      "/api/auth/login",
      {
        body: action.payload,
        method: FetchMethods.Post,
        key: ApiAuthKeys.login,
      }
    );

    yield put(userActions.setSession(response.body));
    yield Router.push("/");
  } catch {}
}

function* registerSaga(action: ReturnType<typeof authActions.register>) {
  try {
    const response: IFetchResult<IAuthenticationResponse> = yield call(
      fetchApi,
      `/api/auth/register`,
      {
        body: action.payload,
        method: FetchMethods.Post,
        key: ApiAuthKeys.register,
      }
    );

    yield put(userActions.setSession(response.body));
    yield Router.push("/");
  } catch {}
}

function* whoamiSaga() {
  try {
    let token = localStorage.getItem("token");

    if (token) {
      const response: IFetchResult<IWhoamiResponse> = yield call(
        fetchApi,
        "/api/auth/whoami",
        {
          method: FetchMethods.Get,
          token,
          key: ApiAuthKeys.whoami,
        }
      );

      yield put(userActions.setSession({ token, user: response.body.user }));
    }
  } catch {
  } finally {
    yield put(authActions.setHasChecked());
  }
}

function* loggedInSaga(action: PayloadAction<ISession>) {
  localStorage.setItem("token", action.payload.token);
  yield put(apiActions.reset(ApiAuthKeys.register));
  yield put(apiActions.reset(ApiAuthKeys.login));
}

function* logoutSaga() {
  try {
    yield call(fetchApi, "/api/auth/logout", {
      method: FetchMethods.Post,
      key: ApiAuthKeys.logout,
    });
  } catch {
  } finally {
    localStorage.removeItem("token");
    location.href = "/";
  }
}

export function* authSagas() {
  yield all([
    takeLatest(authActions.login.type, loginSaga),
    takeLatest(authActions.register.type, registerSaga),
    takeLatest(userActions.setSession.type, loggedInSaga),
    takeLatest(authActions.whoami.type, whoamiSaga),
    takeLatest(authActions.logout.type, logoutSaga),
  ]);
}
