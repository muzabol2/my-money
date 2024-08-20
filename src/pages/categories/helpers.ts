import { useFormik } from "formik";

import { useAuthContext } from "context";

import { categoriesSchema, validateYupSchemaMultiErrors } from "utils";

import { COLLECTION_USERS, FIELD_UID, QUERY_OPERATOR_EQUAL } from "consts";
import { useCollection, useFirestore } from "hooks";

export const useHelpers = () => {
  const { user } = useAuthContext();
  const userId = user?.uid;

  const { categories, error } = useCollection(COLLECTION_USERS, [FIELD_UID, QUERY_OPERATOR_EQUAL, userId]);
  const { addCategory, deleteCategory } = useFirestore(COLLECTION_USERS);

  const categoriesFormik = useFormik({
    initialValues: {
      categories: "",
    },
    validate: (values) => validateYupSchemaMultiErrors(values, categoriesSchema),
    onSubmit: ({ categories }) => {
      addCategory({ id: userId, category: categories });
      resetForm();
    },
  });

  const { isSubmitting, resetForm } = categoriesFormik;

  return {
    consts: { userId, categories, error, categoriesFormik, isSubmitting },
    funcs: { deleteCategory },
  };
};
