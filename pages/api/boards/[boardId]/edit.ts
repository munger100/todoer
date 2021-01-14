import { AuthType, middleware } from "../../../../src/api/middleware";
import { IFetchBoardsResponse } from "../../../../src/api/types/boards";
import { EditBoardSchema } from "../../../../src/utils/validation/board";
import { prisma } from "../../../../src/api/prisma";

export default middleware<IFetchBoardsResponse>(
  async (req, res) => {
    const data = await EditBoardSchema.validate(req.body);

    const editedBoard = await prisma.board.update({
      where: {
        id: req.query.boardId as string,
      },
      data: {
        name: data.name,
        color: data.color,
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
