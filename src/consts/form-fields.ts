import {
  FormFieldLabels as L,
  FormFieldNames as N,
  FormFieldTypes as T,
} from "models";

export const SIGN_UP_FORM_FIELDS = [
  { label: L.DisplayName, name: N.DisplayName, type: T.Text },
  { label: L.Email, name: N.Email, type: T.Text },
  { label: L.Password, name: N.Password, type: T.Password },
  { label: L.PassConfirm, name: N.PassConfirm, type: T.Password },
];

export const LOGIN_FORM_FIELDS = [
  { label: L.Email, name: N.Email, type: T.Text },
  { label: L.Password, name: N.Password, type: T.Password },
];

export const UPDATE_PROFILE_FORM_FIELDS = [
  { label: L.DisplayName, name: N.DisplayName, type: T.Text },
  { label: L.Email, name: N.Email, type: T.Text },
  { label: L.CurrentPassword, name: N.CurrentPassword, type: T.Password },
  { label: L.Password, name: N.Password, type: T.Password },
  { label: L.PassConfirm, name: N.PassConfirm, type: T.Password },
];
