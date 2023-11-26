import { getIn, FieldProps } from "formik";

import {
  StyledFormControl,
  StyledFormHelperText,
  StyledLabel,
  StyledTextField,
} from "./styled";

interface Props extends FieldProps {
  label: string;
}

export const TextFormField = ({ label, field, form }: Props) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <StyledFormControl>
      <StyledLabel isError={!!errorText}>{label}</StyledLabel>
      <StyledTextField
        id={field.name}
        type="text"
        {...field}
        isError={!!errorText}
      />
      {errorText && <StyledFormHelperText>{errorText}</StyledFormHelperText>}
    </StyledFormControl>
  );
};
