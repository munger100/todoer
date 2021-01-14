import { middleware } from "../../../src/api/middleware";
import { IAuthenticationResponse } from "../../../src/api/types/auth";
import { RegisterSchema } from "../../../src/utils/validation/auth";
import { prisma } from "../../../src/api/prisma";
import { Errors } from "../../../src/api/errors";
import { createSession, formatUser } from "../../../src/api/helpers";
import scrypt from "@cretezy/phc-scrypt";

export default middleware<IAuthenticationResponse>(async (req, res) => {
  const data = await RegisterSchema.validate(req.body);

  const user = await prisma.user.findOne({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return {
      errors: [Errors.UserNotFound],
    };
  }

  const isPasswordValid = scrypt.verify(user.password, data.password);

  if (!isPasswordValid) {
    return {
      errors: [Errors.InvalidPassword],
    };
  }

  const session = await createSession(user);

  return {
    user: formatUser(user),
    token: session.token,
  };
});
