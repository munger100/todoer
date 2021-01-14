import { prisma } from "../../../../src/api/prisma";
import { IFetchBoardsResponse } from "../../../../src/api/types/boards";
import { AuthType, middleware } from "../../../../src/api/middleware";

export default middleware<IFetchBoardsResponse>(
  async (req, res) => {
    await prisma.board.delete({
      where: {
        id: req.query.boardId as string,
      },
    });

    const boards = await prisma.board.findMany({
      where: {
        owner: {
          id: req.user.id as string,
        },
      },
    });

    return {
      boards,
    };
  },
  { auth: AuthType.User }
);
