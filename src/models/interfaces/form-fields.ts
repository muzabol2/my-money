import { FormFieldLabels, FormFieldNames, FormFieldTypes, FormFieldNames as N } from "../enums";

interface FormField {
  label: FormFieldLabels;
  name: FormFieldNames;
  type: FormFieldTypes;
}

interface LoginValues {
  [N.email]: string;
  [N.password]: string;
}

interface SignupValues {
  [N.displayName]: string;
  [N.email]: string;
  [N.password]: string;
  [N.passConfirm]: string;
}

interface UpdateValues {
  [N.displayName]: string;
  [N.email]: string;
  [N.password]: string;
  [N.newPass]: string;
  [N.newPassConfirm]: string;
}

type FormikFormValues = LoginValues | SignupValues | UpdateValues;

export type { FormField, LoginValues, SignupValues, UpdateValues, FormikFormValues };
