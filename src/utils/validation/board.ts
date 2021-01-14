import * as Yup from "yup";
import {
  ICreateBoardsPayload,
  IEditBoardsPayload,
} from "../../api/types/boards";
import { ICreateTaskPayload, ITask } from "../../api/types/tasks";
import { NameValidator } from "./index";
import { IEditTaskAction } from "../../store/modules/boards/types";

export const CreateBoardSchema = Yup.object().shape<ICreateBoardsPayload>({
  name: NameValidator,
  color: Yup.string().notRequired(),
});

export const EditBoardSchema = Yup.object().shape<IEditBoardsPayload>({
  id: Yup.string().required(),
  name: NameValidator.notRequired(),
  color: Yup.string().notRequired().nullable(),
});

// @ts-ignore
export const CreateTaskSchema = Yup.object().shape<ICreateTaskPayload>({
  id: Yup.string().required(),
  label: NameValidator,
});

export const EditTaskSchema = Yup.object().shape<IEditTaskAction>({
  boardId: Yup.string().required(),
  taskId: Yup.string().required(),
  label: NameValidator,
});
