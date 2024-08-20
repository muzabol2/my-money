import * as yup from "yup";
import { FormFieldNames as N, ValidationMessages as VM } from "models";

const regExp = {
  transactionName: /^[\s\p{L}0-9]+$/u,
  amount: /^(\d{0,12})([.,]\d{0,2})?$/,
  passLowercase: /[a-z]+/,
  passUppercase: /[A-Z]+/,
  passSpecialChar: /[@$!%*#?&]+/,
  passNumber: /\d+/,
  onlyLettersNumbersSpaces: /^[\s\p{L}0-9]+$/u,
};

const chars = {
  displayMin: 5,
  displayMax: 20,
  passMin: 5,
  transactionMin: 5,
  transactionMax: 35,
  categoriesMin: 3,
  categoriesMax: 20,
};

export const signupSchema = yup.object().shape({
  [N.displayName]: yup
    .string()
    .min(chars.displayMin, VM.DisplayNameMinMaxChar)
    .max(chars.displayMax, VM.DisplayNameMinMaxChar)
    .required(VM.Required),
  [N.email]: yup.string().email(VM.EmailInvalid).required(VM.Required),
  [N.password]: yup
    .string()
    .min(chars.passMin, VM.PassMinChar)
    .matches(regExp.passLowercase, VM.PassLowercase)
    .matches(regExp.passUppercase, VM.PassUppercase)
    .matches(regExp.passSpecialChar, VM.PassSpecialChar)
    .matches(regExp.passNumber, VM.PassNumber)
    .required(VM.Required),
  [N.passConfirm]: yup
    .string()
    .oneOf([yup.ref(N.password), null], VM.PassMustMatch)
    .required(VM.Required),
});

export const loginSchema = yup.object().shape({
  [N.email]: yup.string().email(VM.EmailInvalid).required(VM.Required),
  [N.password]: yup.string().required(VM.Required),
});

export const updateSchema = yup.object().shape({
  [N.password]: yup.string().required(VM.Required),
  [N.displayName]: yup
    .string()
    .min(chars.displayMin, VM.DisplayNameMinMaxChar)
    .max(chars.displayMax, VM.DisplayNameMinMaxChar)
    .required(VM.Required),
  [N.newPass]: yup
    .string()
    .min(chars.passMin, VM.PassMinChar)
    .matches(regExp.passLowercase, VM.PassLowercase)
    .matches(regExp.passUppercase, VM.PassUppercase)
    .matches(regExp.passSpecialChar, VM.PassSpecialChar)
    .matches(regExp.passNumber, VM.PassNumber),
  [N.newPassConfirm]: yup.string().oneOf([yup.ref(N.newPass), null], VM.PassMustMatch),
});

export const categoriesSchema = yup.object({
  categories: yup
    .string()
    .min(chars.categoriesMin, VM.DisplayNameMinMaxChar)
    .max(chars.categoriesMax, VM.DisplayNameMinMaxChar)
    .matches(regExp.onlyLettersNumbersSpaces, VM.OnlyLettersNumbersSpaces)
    .required(VM.Required),
});
export const transactionSchema = yup.object({
  transactionName: yup
    .string()
    .min(chars.transactionMin, VM.TransactionNameMinMaxChar)
    .max(chars.transactionMax, VM.TransactionNameMinMaxChar)
    .matches(regExp.transactionName, VM.OnlyLettersNumbersSpaces)
    .required(VM.Required),
  amount: yup.string().matches(regExp.amount, VM.AmountValidation).required(VM.Required),
  transactionDate: yup.string().required(VM.Required).nullable(),
  transactionCategory: yup.string().required(VM.Required),
});
