import { AuthType, middleware } from "../../../src/api/middleware";
import { IFetchBoardsResponse } from "../../../src/api/types/boards";
import { prisma } from "../../../src/api/prisma";

export default middleware<IFetchBoardsResponse>(
  async (req, res) => {
    const boards = await prisma.board.findMany();

    return {
      boards,
    };
  },
  { auth: AuthType.User }
);
