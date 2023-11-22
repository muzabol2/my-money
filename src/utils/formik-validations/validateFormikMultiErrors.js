import { getIn, setIn, validateYupSchema } from "formik";

// https://github.com/jaredpalmer/formik/pull/1573
// Copied from PR: https://github.com/formium/formik/pull/1573
/**
 * Transform Yup ValidationError to a more usable object
 */
const yupToFormErrors = (yupError, validationSchemaOptions) => {
  let errors = {};

  if (yupError.inner.length === 0) {
    return setIn(errors, yupError.path, yupError.message);
  }
  // if showMultipleFieldErrors is enabled, set the error value
  // to an array of all errors for that field
  if (validationSchemaOptions.showMultipleFieldErrors) {
    for (let err of yupError.inner) {
      let fieldErrors = getIn(errors, err.path);

      if (!fieldErrors) {
        fieldErrors = [];
      }
      fieldErrors.push(err.message);
      errors = setIn(errors, err.path, fieldErrors);
    }
  } else {
    for (let err of yupError.inner) {
      if (!errors[err.path]) {
        errors = setIn(errors, err.path, err.message);
      }
    }
  }

  return errors;
};

export const validateYupSchemaMultiErrors = async (values, schema) => {
  try {
    await validateYupSchema(values, schema);

    return {};
  } catch (error) {
    return yupToFormErrors(error, { showMultipleFieldErrors: true });
  }
};
