import { FormFieldLabels, FormFieldNames, FormFieldTypes, FormFieldNames as N } from "../enums";

export interface FormField {
  label: FormFieldLabels;
  name: FormFieldNames;
  type: FormFieldTypes;
}

export interface LoginValues {
  [N.email]: string;
  [N.password]: string;
}

export interface SignupValues {
  [N.displayName]: string;
  [N.email]: string;
  [N.password]: string;
  [N.passConfirm]: string;
}

export interface UpdateValues {
  [N.displayName]: string;
  [N.email]: string;
  [N.password]: string;
  [N.newPass]: string;
  [N.newPassConfirm]: string;
}

export type FormikFormValues = LoginValues | SignupValues | UpdateValues;
