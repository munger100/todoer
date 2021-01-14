import { AuthType, middleware } from "../../../../../src/api/middleware";
import { IFetchBoardsResponse } from "../../../../../src/api/types/boards";
import { CreateTaskSchema } from "../../../../../src/utils/validation/board";
import { prisma } from "../../../../../src/api/prisma";

export default middleware<IFetchBoardsResponse>(
  async (req, res) => {
    const data = await CreateTaskSchema.validate(req.body);

    const newTask = await prisma.task.create({
      data: {
        label: data.label,
        // reminder: data.reminder,
        // deadline: data.deadline,
        completed: false,
        assignee: {
          connect: {
            id: req.user.id,
          },
        },
        Board: {
          connect: {
            id: req.query.boardId as string,
          },
        },
      },
    });

    const boards = await prisma.board.findMany({
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
