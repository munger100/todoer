import { EditTaskSchema } from "../../../../../../src/utils/validation/board";
import { IFetchBoardsResponse } from "../../../../../../src/api/types/boards";
import { AuthType, middleware } from "../../../../../../src/api/middleware";
import { prisma } from "../../../../../../src/api/prisma";

export default middleware<IFetchBoardsResponse>(
  async (req, res) => {
    const data = await EditTaskSchema.validate(req.body);

    const editedTask = await prisma.task.update({
      where: {
        id: req.query.taskId as string,
      },
      data: {
        label: data.label,
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
