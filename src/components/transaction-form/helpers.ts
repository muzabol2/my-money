import { useFormik } from "formik";

import { formatDate, generateCurrentDate, toNumber, transactionSchema, useCollection, useFirestore } from "utils";

import { FormFieldLabels as L, FormFieldNames as N, FormFieldTypes as T } from "models";
import { COLLECTION_TRANSACTIONS, COLLECTION_USERS, FIELD_UID, QUERY_OPERATOR_EQUAL } from "consts";

import { TextFormField, DatePickerField, SelectFormField } from "components";

export const useHelpers = (uid: string) => {
  const { addDocument } = useFirestore(COLLECTION_TRANSACTIONS);
  const { categories } = useCollection(COLLECTION_USERS, [FIELD_UID, QUERY_OPERATOR_EQUAL, uid]);

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
    onSubmit: ({ transactionName, transactionDate, transactionCategory, amount }) => {
      addDocument({
        uid,
        transactionName,
        transactionDate: formatDate(transactionDate),
        transactionCategory,
        amount: toNumber(amount),
      });
      transactionFormik.resetForm();
    },
  });

  return { transactionFormFields, transactionFormik };
};
