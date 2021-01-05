import { NextApiRequest, NextApiResponse } from "next";

import { IErrorsResponse } from "./types";
import { ApiErrors } from "./ApiErrors";
import { Errors } from "./errors";
import { ValidationError } from "yup";

export type AppRequest = NextApiRequest;

export enum AuthType {
  User = "user",
}

export interface IMiddlewareOptions {
  auth?: boolean | AuthType;
}

export type NextHandler<T> = (
  req: AppRequest,
  res: NextApiResponse
) => T | Promise<T> | undefined;

export function middleware<ResultType>(
  handler: NextHandler<ResultType | IErrorsResponse>,
  options: IMiddlewareOptions = {}
) {
  return async (req: AppRequest, res: NextApiResponse) => {
    try {
      if (options.auth) {
        if (options.auth === AuthType.User) {
          console.log("Auth");
        } else {
          throw new ApiErrors([Errors.InvalidAuthorization], 400);
        }
      }

      if (req.body && typeof req.body === "string") {
        try {
          req.body = JSON.parse(req.body);
        } catch {
          req.body = undefined;
        }
      }

      const result = await handler(req, res);

      if (result === null) {
        res.end();
      } else if (!result) {
        res.json({});
      } else if ("errors" in result) {
        // @ts-ignore
        throw new ApiErrors(result.errors, result.statusCode || 400);
      } else {
        res.json(result);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ApiErrors) {
        if (error.metadata?.unexpected) {
          console.error({ error });
        }
        res.status(error.statusCode || 500).json({ errors: error.errors });
      } else if (error instanceof ValidationError) {
        // Handle yup validation errors
        res.status(400).json({ errors: error.errors });
      } else {
        console.error("Unknown API error", error);
        res.status(500).json({ errors: [Errors.UnknownError] });
      }
    }
  };
}
