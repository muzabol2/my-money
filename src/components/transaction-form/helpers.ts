import { useFormik } from "formik";

import {
  formatDate,
  generateCurrentDate,
  toNumber,
  transactionSchema,
} from "utils";
import { useCollection, useFirestore } from "hooks";

import {
  FormFieldLabels as L,
  FormFieldNames as N,
  FormFieldTypes as T,
} from "models";

import { TextFormField, DatePickerField, SelectFormField } from "components";

export const useHelpers = (uid: string) => {
  const { addDocument } = useFirestore("transactions");
  const { categories } = useCollection("users", ["uid", "==", uid]);

  const transactionFormFields = [
    {
      label: L.transactionName,
      name: N.transactionName,
      type: T.text,
      component: TextFormField,
    },
    {
      label: L.transactionDate,
      name: N.transactionDate,
      type: T.text,
      component: DatePickerField,
    },
    {
      label: L.transactionCategory,
      name: N.transactionCategory,
      type: T.text,
      component: SelectFormField,
      options: categories,
    },
    { label: L.amount, name: N.amount, type: T.text, component: TextFormField },
  ];

  const transactionFormik = useFormik({
    initialValues: {
      [N.transactionName]: "",
      [N.transactionDate]: generateCurrentDate(),
      [N.transactionCategory]: "",
      [N.amount]: "",
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
