import * as yup from 'yup';

const amountRules = /^(\d{0,12})([\.]\d{0,2})?$/;
// Only numbers, max 12 digits and 2 decimal places

export const transactionSchema = yup.object().shape({
   transactionName: yup
      .string()
      .min(3, "3-20 characters\n")
      .max(20, "3-20 characters\n")
      .matches(/^[A-Za-z0-9 ]*$/, "Only letters, numbers and spaces")
      .required("Required"),
   amount: yup
      .string()
      .matches(amountRules, "\u2022 Only numbers\n\u2022 max 12 digits\n\u2022 dot(.) not comma(,) separator\n\u2022 only 2 decimal places")
      .required("Required"),
});
