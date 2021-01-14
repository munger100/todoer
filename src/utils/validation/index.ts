import * as Yup from "yup";
import { Errors } from "../../api/errors";

export const NameValidator = Yup.string().min(1, Errors.InvalidName);

export const EmailValidator = Yup.string()
  .email(Errors.InvalidEmail)
  .max(256, Errors.InvalidEmail);

export const PasswordValidator = Yup.string()
  .min(8, Errors.PasswordTooShort)
  .max(256, Errors.PasswordTooLong);
