import { IUser } from "./types/user";
import { prisma } from "./prisma";
import cryptoRandomString from "crypto-random-string";
import { UserGetPayload, User } from "@prisma/client";

export async function createSession(user: User) {
  return await prisma.session.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      token: cryptoRandomString({ length: 32, type: "url-safe" }),
    },
  });
}

export function formatUser(user: UserGetPayload<{}>): IUser {
  return {
    name: user.name,
    email: user.email,
    id: user.id,
  };
}
