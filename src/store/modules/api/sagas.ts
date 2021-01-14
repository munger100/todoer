import { put, call, select } from "@redux-saga/core/effects";
import { IErrorsResponse } from "../../../api/types";
import { apiActions } from ".";
import { selectSession } from "../user/selectors";
import { selectSignature } from "../auth/selectors";

export class ApiErrors extends Error {
  readonly errors: string[];

  constructor(errors: string[]) {
    super(errors.join("\n"));

    this.errors = errors;

    Object.setPrototypeOf(this, ApiErrors.prototype);
  }
}

export enum FetchMethods {
  Get = "GET",
  Post = "POST",
  Delete = "DELETE",
}

export interface IFetchOptions<BodyType> {
  body?: unknown;
  rawBody?: BodyInit | null;
  method?: FetchMethods;
  headers?: HeadersInit;
  token?: string;
  key?: string;
  noParse?: boolean;
  callback?: (response: IFetchResult<BodyType>) => Generator;
}

export interface IFetchResult<BodyType> {
  body: BodyType;
  response: Response;
}

export function* fetchApi<BodyType = object>(
  path: string,
  options: IFetchOptions<BodyType> = {}
) {
  try {
    const headers: HeadersInit = {
      accept: "application/json",
    };

    const token: string | undefined =
      options.token || (yield select(selectSession))?.token;
    const signature: string | undefined = yield select(selectSignature);

    if (token && !headers["authorization"]) {
      headers["authorization"] = `Bearer ${token}`;
    }

    if (signature) {
      headers["x-signature"] = signature;
    }

    if (options.key) {
      yield put(apiActions.startRequest(options.key));
    }

    const response: Response = yield fetch(path, {
      headers,
      body:
        options.rawBody ||
        (options.body ? JSON.stringify(options.body) : undefined),
      method: options.method || FetchMethods.Get,
    });

    const body: BodyType | IErrorsResponse | undefined = options.noParse
      ? undefined
      : yield response.json();

    if (typeof body === "object" && "errors" in body) {
      throw new ApiErrors(body.errors);
    }

    const result: IFetchResult<BodyType> = {
      body,
      response,
    };

    if (options.callback) {
      try {
        yield call(() => options.callback(result));
      } catch {}
    }

    if (options.key) {
      yield put(apiActions.completeRequest({ key: options.key }));
    }

    return result;
  } catch (error) {
    if (options.key) {
      const errors =
        error instanceof ApiErrors ? error.errors : [error.toString()];

      yield put(
        apiActions.completeRequest({
          key: options.key,
          errors,
        })
      );
    }

    throw error;
  }
}
