export enum Errors {
  UserNotFound = "USER_NOT_FOUND",
  InvalidPassword = "INVALID_PASSWORD",
  InvalidAuthorization = "INVALID_AUTHORIZATION",
  UnknownError = "UNKNOWN_ERROR",
  InvalidName = "INVALID_NAME",
}

export const errorText = {
  [Errors.InvalidName]: "Invalid Name",
};
