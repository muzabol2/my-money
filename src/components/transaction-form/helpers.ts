import { useFormik } from "formik";

import {
  formatDate,
  generateCurrentDate,
  toNumber,
  transactionSchema,
} from "utils";
import { useCollection, useFirestore } from "hooks";

import { TextFormField, DatePickerField, SelectFormField } from "components";

export const useHelpers = (uid: string) => {
  const { addDocument } = useFirestore("transactions");
  const { categories } = useCollection("users", ["uid", "==", uid]);

  const transactionFormFields = [
    {
      label: "Transaction name",
      name: "transactionName",
      component: TextFormField,
    },
    { label: "Date", name: "transactionDate", component: DatePickerField },
    {
      label: "Category",
      name: "transactionCategory",
      component: SelectFormField,
      options: categories,
    },
    { label: "Amount", name: "amount", component: TextFormField },
  ];

  const transactionFormik = useFormik({
    initialValues: {
      transactionName: "",
      transactionDate: generateCurrentDate(),
      transactionCategory: "",
      amount: "",
    },
    validationSchema: transactionSchema,
    onSubmit: ({
      transactionName,
      transactionDate,
      transactionCategory,
      amount,
    }) => {
      addDocument({
        uid,
        transactionName,
        transactionDate: formatDate(transactionDate),
        transactionCategory,
        amount: toNumber(amount),
      });
      resetForm();
    },
  });

  const { handleSubmit, resetForm } = transactionFormik;

  return {
    transactionFormFields,
    transactionFormik,
    handleSubmit,
  };
};
