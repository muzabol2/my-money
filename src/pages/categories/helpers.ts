import { useFormik } from "formik";

import { useAuthContext } from "context";
import { categoriesSchema, validateYupSchemaMultiErrors } from "utils";
import { useCollection, useFirestore } from "hooks";

export const useHelpers = () => {
  const { user } = useAuthContext();
  const userId = user?.uid;

  const { categories, error } = useCollection("users", ["uid", "==", userId]);
  const { updateCategories, deleteCategories } = useFirestore("users");

  const categoriesFormik = useFormik({
    initialValues: {
      categories: "",
    },
    validate: (values) =>
      validateYupSchemaMultiErrors(values, categoriesSchema),
    onSubmit: (values) => {
      updateCategories({ id: userId, category: values.categories });
      resetForm();
    },
  });

  const { isSubmitting, handleSubmit, resetForm } = categoriesFormik;

  return {
    consts: { userId, categories, error, categoriesFormik, isSubmitting },
    funcs: {
      deleteCategories,
      handleSubmit,
    },
  };
};
