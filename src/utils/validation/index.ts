import * as Yup from "yup";
import { Errors } from "../../api/errors";

export const NameValidator = Yup.string().min(1, Errors.InvalidName);
