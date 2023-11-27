import {
  FormFieldLabels as L,
  FormFieldNames as N,
  FormFieldTypes as T,
} from "models";

export const SIGN_UP_FORM_FIELDS = [
  { label: L.displayName, name: N.displayName, type: T.text },
  { label: L.email, name: N.email, type: T.text },
  { label: L.password, name: N.password, type: T.password },
  { label: L.passConfirm, name: N.passConfirm, type: T.password },
];

export const LOGIN_FORM_FIELDS = [
  { label: L.email, name: N.email, type: T.text },
  { label: L.password, name: N.password, type: T.password },
];

export const UPDATE_PROFILE_FORM_FIELDS = [
  { label: L.displayName, name: N.displayName, type: T.text },
  { label: L.email, name: N.email, type: T.text },
  { label: L.password, name: N.password, type: T.password },
  { label: L.newPass, name: N.newPass, type: T.password },
  { label: L.newPassConfirm, name: N.newPassConfirm, type: T.password },
];
