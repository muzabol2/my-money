import { FieldProps, getIn } from "formik";

import { formatInputDate } from "utils";

import { StyledDateInput, StyledFormControl, StyledFormHelperText, StyledLabel } from "./styled";

interface DateFieldProps extends FieldProps {
  label: string;
}

export const DatePickerField = ({ label, field, form }: DateFieldProps) => {
  const updatedField = { ...field, value: formatInputDate(field?.value) };

  const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <StyledFormControl>
      <StyledLabel isError={!!errorText}>{label}</StyledLabel>
      <StyledDateInput id={field.name} type="date" {...updatedField} />
      <StyledFormHelperText isError={!!errorText}>{errorText}</StyledFormHelperText>
    </StyledFormControl>
  );
};
