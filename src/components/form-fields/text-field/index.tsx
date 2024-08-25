import { FieldProps, getIn } from "formik";
import { StyledFormControl, StyledFormHelperText, StyledLabel, StyledTextField } from "./styled";

interface TextFieldProps extends FieldProps {
  label: string;
  type?: string;
}

const TextFormField = ({ field, form, label, type }: TextFieldProps) => {
  const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <StyledFormControl>
      <StyledLabel $isError={!!errorText}>{label}</StyledLabel>
      <StyledTextField id={field.name} type={type ? type : "text"} {...field} $isError={!!errorText} />
      {errorText && <StyledFormHelperText>{errorText}</StyledFormHelperText>}
    </StyledFormControl>
  );
};

export { TextFormField };
