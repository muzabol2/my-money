import { Field, Form, FormikProvider, FormikProps } from "formik";

import { FormField, FormikFormValues } from "models";

import { TextFormField } from "components";

import { StyledContainer, StyledButton } from "./styled";

type Props<T extends FormikFormValues> = {
  formik: FormikProps<T>;
  formFields: FormField[];
  buttonText: string;
};

const FormikForm = <T extends FormikFormValues>({ formik, formFields, buttonText }: Props<T>) => (
  <FormikProvider value={formik}>
    <Form onSubmit={formik.handleSubmit}>
      <StyledContainer>
        {formFields.map((field: FormField) => (
          <Field key={field.name} component={TextFormField} {...field} />
        ))}

        <StyledButton type="submit">{buttonText}</StyledButton>
      </StyledContainer>
    </Form>
  </FormikProvider>
);

export default FormikForm;
