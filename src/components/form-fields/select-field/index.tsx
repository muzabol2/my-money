import { FieldProps, getIn } from "formik";

import { SelectOption } from "models";

import {
  StyledFormControl,
  StyledFormHelperText,
  StyledInputLabel,
  StyledOption,
  StyledSelect,
} from "./styled";

interface SelectFieldProps extends FieldProps {
  options: SelectOption[];
  label: string;
}

export const SelectFormField = ({
  field,
  form,
  options,
  label,
}: SelectFieldProps) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <StyledFormControl>
      {label && <StyledInputLabel>{label}</StyledInputLabel>}
      <StyledSelect {...field}>
        <StyledOption value="" disabled>
          Select
        </StyledOption>
        {options?.map((op, index) => (
          <StyledOption key={index}>{op}</StyledOption>
        ))}
      </StyledSelect>
      <StyledFormHelperText isError={!!errorText}>
        {errorText}
      </StyledFormHelperText>
    </StyledFormControl>
  );
};
