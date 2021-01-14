import { formatUser } from "../../../src/api/helpers";
import { middleware } from "../../../src/api/middleware";
import { IWhoamiResponse } from "../../../src/api/types/auth";

export default middleware<IWhoamiResponse>(
  async (req, res) => {
    return {
      user: formatUser(req.user),
    };
  },
  { auth: true }
);
