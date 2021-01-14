export enum Errors {
  UserNotFound = "USER_NOT_FOUND",
  InvalidPassword = "INVALID_PASSWORD",
  InvalidAuthorization = "INVALID_AUTHORIZATION",
  UnknownError = "UNKNOWN_ERROR",
  InvalidName = "INVALID_NAME",
  InvalidEmail = "INVALID_EMAIL",
  PasswordTooLong = "PASSWORD_TOO_LONG",
  PasswordTooShort = "PASSWORD_TOO_SHORT",
  UserAlreadyExists = "USER_ALREADY_EXISTS",
}

export const errorText = {
  [Errors.InvalidName]: "Invalid Name",
};
