import { getIn, setIn, validateYupSchema, FormikValues, FormikErrors } from "formik";
import { AnySchema, ValidationError } from "yup";

const yupToFormErrors = <T>(
  yupError: ValidationError,
  validationSchemaOptions: { showMultipleFieldErrors?: boolean },
) => {
  let errors: FormikErrors<T> = {};

  if (yupError.inner.length === 0) {
    return setIn(errors, yupError.path ?? "", yupError.message);
  }

  if (validationSchemaOptions.showMultipleFieldErrors) {
    yupError.inner.map((err) => {
      const errorPath = err.path ?? "";
      const fieldErrors = getIn(errors, errorPath) || [];

      fieldErrors.push(err.message);
      errors = setIn(errors, errorPath, fieldErrors);

      return null;
    });
  } else {
    yupError.inner.map((err) => {
      const errorPath = err.path ?? "";

      if (!Object.prototype.hasOwnProperty.call(errors, errorPath)) {
        errors = setIn(errors, errorPath, err.message);
      }

      return null;
    });
  }

  return errors;
};

export const validateYupSchemaMultiErrors = async <T extends FormikValues>(values: T, schema: AnySchema) => {
  try {
    await validateYupSchema(values, schema);

    return {};
  } catch (error) {
    if (error instanceof ValidationError) {
      return yupToFormErrors(error, { showMultipleFieldErrors: true });
    }
    throw error;
  }
};
