import { NextApiRequest, NextApiResponse } from "next";

import { IErrorsResponse } from "./types";
import { ApiErrors } from "./ApiErrors";
import { Errors } from "./errors";
import { ValidationError } from "yup";
import { prisma } from "./prisma";
import {
  BoardGetPayload,
  Session,
  UserGetPayload,
  TaskGetPayload,
} from "@prisma/client";

export enum AuthType {
  User = "user",
}

export interface IMiddlewareOptions {
  auth?: boolean | AuthType;
}

export type AppRequest = NextApiRequest & {
  board?: BoardGetPayload<{
    include: {
      tasks: true;
    };
  }>;
  session?: Session;
  user?: UserGetPayload<{}>;
  task?: TaskGetPayload<{}>;
};

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
          await doUserAuthentication(req);
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

async function doUserAuthentication(req: AppRequest) {
  if (
    (!req.headers["authorization"] ||
      req.headers["authorization"].length !== 7 + 32 ||
      !req.headers["authorization"].startsWith("Bearer ")) &&
    !req.query["_token"]
  ) {
    throw new ApiErrors([Errors.InvalidAuthorization], 400);
  }

  const token =
    req.headers["authorization"]?.slice(7) || (req.query["_token"] as string);

  // if (
  //   !verifyTokenSignature(
  //     token,
  //     req.cookies[signatureCookieName] || (req.headers["x-signature"] as string)
  //   )
  // ) {
  //   // TODO: verifyTokenSignature
  //   throw new ApiErrors([Errors.InvalidAuthorization], 400);
  // }

  const session = await prisma.session.findOne({
    where: { token },
    include: {
      user: true,
    },
  });

  if (!session) {
    throw new ApiErrors([Errors.InvalidAuthorization], 400);
  }

  req.session = session;
  req.user = session.user;
}
