import { FirestoreType as FT } from "../types";

enum ErrorMessages {
  INVALID_CONTEXT = "useAuthContext must be used within an AuthContextProvider",
  COULD_NOT_FETCH_DATA = "Could not fetch data",
  COULD_NOT_ADD_DOC = "Could not add document",
  COULD_NOT_DELETE = "Could not delete",
  COULD_NOT_UPDATE = "Could not update",
  COULD_NOT_CREATE_USER_ACCOUNT = "Could not create user account",
}

enum StatusMessages {
  EMAIL_NOT_VERIFIED = "Email not verified",
  EMPTY = "",
  NO_USER_LOGGED_IN = "No user is currently logged in.",
  PROFILE_UPDATED = "Profile updated",
  USER_ACCOUNT_CREATED = "User account created!",
  USER_LOGGED_IN = "User logged in",
  USER_LOGGED_OUT = "User logged out",
  WRONG_CREDENTIALS = "Wrong email or password",
  COULD_NOT_UPDATE_PROFILE = "Could not update profile",
}

enum ValidationMessages {
  DisplayNameMinMaxChar = "5-20 characters",
  EmailInvalid = "Please enter a valid email",
  PassMinChar = "\u2022 5 characters or more \n",
  PassLowercase = "\u2022 One lowercase character\n",
  PassUppercase = "\u2022 One uppercase character\n",
  PassSpecialChar = "\u2022 One special character (@$!%*#?&)\n",
  PassNumber = "\u2022 One number",
  PassMustMatch = "Passwords must match",
  TransactionNameMinMaxChar = "5-35 characters",
  OnlyLettersNumbersSpaces = "Only letters, numbers, and spaces",
  AmountValidation = "Only numbers, max 12 digits, dot (.) or comma (,) separator, only 2 decimal places",
  Required = "Required",
}

const FirestoreMessages = {
  [FT.ADDED_USER]: "User added",
  [FT.ADDED_DOC]: "Document added",
  [FT.DELETED_DOC]: "Document deleted",
  [FT.ADDED_CATEGORY]: "Category added",
  [FT.DELETED_CATEGORY]: "Category removed",
};

export { ErrorMessages, StatusMessages, ValidationMessages, FirestoreMessages };
