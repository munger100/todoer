import * as Yup from "yup";
import { ICreateBoardsPayload } from "../../api/types/boards";
import { ICreateTaskPayload } from "../../api/types/tasks";
import { NameValidator } from "./index";

export const CreateBoardSchema = Yup.object().shape<ICreateBoardsPayload>({
  name: NameValidator,
  color: Yup.string().notRequired(),
});

export const CreateTaskSchema = Yup.object().shape<ICreateTaskPayload>({
  label: NameValidator,
  reminder: Yup.string().notRequired(),
  deadline: Yup.string().notRequired(),
});
