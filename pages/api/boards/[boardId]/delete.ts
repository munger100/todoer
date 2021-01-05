import { prisma } from "../../../../src/api/prisma";
import { IFetchBoardsResponse } from "../../../../src/api/types/boards";
import { AuthType, middleware } from "../../../../src/api/middleware";

export default middleware<IFetchBoardsResponse>(
  async (req, res) => {
    await prisma.board.delete({
      where: {
        id: req.query.boardId,
      },
    });

    const boards = await prisma.board.findMany({});

    return {
      boards,
    };
  },
  { auth: AuthType.User }
);
