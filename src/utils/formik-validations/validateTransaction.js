import * as yup from 'yup';

const regExp = {
   transactionName: /^[\s\p{L}0-9]+$/u,
   amount: /^(\d{0,12})([.,]\d{0,2})?$/,
}

export const transactionSchema = yup.object({
   transactionName: yup
      .string()
      .min(5, "5-35 characters\n")
      .max(35, "5-35 characters\n")
      .matches(regExp.transactionName, "Only letters, numbers and spaces")
      .required("Required"),
   amount: yup
      .string()
      .matches(regExp.amount, "\u2022 Only numbers\n\u2022 max 12 digits\n\u2022 dot(.) or comma(,) separator\n\u2022 only 2 decimal places")
      .required("Required"),
   transactionDate: yup
      .string()
      .required("Required")
      .nullable(),
   transactionCategory: yup
      .string()
      .required("Required"),
});
