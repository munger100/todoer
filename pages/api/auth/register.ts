import scrypt from "@cretezy/phc-scrypt";
import { middleware } from "../../../src/api/middleware";
import { IAuthenticationResponse } from "../../../src/api/types/auth";
import { RegisterSchema } from "../../../src/utils/validation/auth";
import { prisma } from "../../../src/api/prisma";
import { Errors } from "../../../src/api/errors";
import { createSession, formatUser } from "../../../src/api/helpers";
import { setSignatureCookie } from "../../../src/api/signature";

export default middleware<IAuthenticationResponse>(async (req, res) => {
  console.log({ body: req.body });
  const data = await RegisterSchema.validate(req.body);

  const existingUser = await prisma.user.findOne({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    return {
      errors: [Errors.UserAlreadyExists],
    };
  }

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: await scrypt.hash(data.password),
      name: data.name,
    },
  });

  const session = await createSession(user);

  setSignatureCookie(res, session.token);

  return {
    user: formatUser(user),
    token: session.token,
  };
});
