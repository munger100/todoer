import { IFetchBoardsResponse } from "../../../../../../src/api/types/boards";
import { AuthType, middleware } from "../../../../../../src/api/middleware";
import { prisma } from "../../../../../../src/api/prisma";
import { Errors } from "../../../../../../src/api/errors";

export default middleware<IFetchBoardsResponse>(
  async (req, res) => {
    const task = await prisma.task.findOne({
      where: {
        id: req.query.taskId as string,
      },
    });

    if (!task) {
      return {
        errors: [Errors.UnknownError],
      };
    }

    await prisma.task.update({
      where: {
        id: req.query.taskId as string,
      },
      data: {
        completed: !task.completed,
      },
    });

    const boards = await prisma.board.findMany({
      where: {
        owner: {
          id: req.user.id,
        },
      },
      include: {
        tasks: true,
      },
    });

    return {
      boards,
    };
  },
  { auth: AuthType.User }
);
