import * as Yup from "yup";
import { ILoginPayload, IRegisterPayload } from "../../api/types/auth";
import { EmailValidator, NameValidator, PasswordValidator } from "./index";

export const RegisterSchema = Yup.object().shape<IRegisterPayload>({
  name: NameValidator,
  email: EmailValidator,
  password: PasswordValidator,
});

export const LoginSchema = Yup.object().shape<ILoginPayload>({
  email: EmailValidator,
  password: PasswordValidator,
});
