import { AuthType, middleware } from "../../../src/api/middleware";
import { IFetchBoardsResponse } from "../../../src/api/types/boards";
import { prisma } from "../../../src/api/prisma";
import { CreateBoardSchema } from "../../../src/utils/validation/board";

export default middleware<IFetchBoardsResponse>(
  async (req, res) => {
    const data = await CreateBoardSchema.validate(req.body);

    const newBoard = await prisma.board.create({
      data: {
        name: data.name,
      },
    });

    const boards = await prisma.board.findMany({});

    return {
      boards,
    };
  },
  { auth: AuthType.User }
);
