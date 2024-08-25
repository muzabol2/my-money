import { useFormik } from "formik";
import { COLLECTION_USERS, FIELD_UID, QUERY_OPERATOR_EQUAL } from "consts";
import { useAuthContext } from "context";
import { useCollection, useFirestore } from "hooks";
import { categoriesSchema, validateYupSchemaMultiErrors } from "utils";

const useHelpers = () => {
  const { user } = useAuthContext();
  const userId = user?.uid ?? "";

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

export { useHelpers };
