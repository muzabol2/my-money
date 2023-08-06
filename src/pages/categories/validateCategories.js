import * as yup from "yup";

export const categoriesSchema = yup.object({
  categories: yup
    .string()
    .min(3, "3-20 characters\n")
    .max(20, "3-20 characters\n")
    .matches(/^[\s\p{L}0-9]+$/u, "Only letters, numbers and spaces")
    .required("Required"),
});
