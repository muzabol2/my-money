import { RedirectPaths as P, PagesTexts as PT } from "models";

export const SIGNUP_BELOW_TEXTS = [
  { name: PT.HAVE_ACCOUNT, link: P.LOGIN, linkName: PT.LOGIN },
  {
    name: PT.WHY_THIS_PROJECT,
    link: P.INSPIRATION,
    linkName: PT.INSPIRATION,
  },
];

export const LOGIN_BELOW_TEXTS = [
  { name: PT.HAVE_ACCOUNT, link: P.SIGNUP, linkName: PT.SIGNUP },
  {
    name: PT.WHY_THIS_PROJECT,
    link: P.INSPIRATION,
    linkName: PT.INSPIRATION,
  },
];

export const INSPIRATION_BELOW_TEXTS = [
  { name: PT.HAVE_ACCOUNT, link: P.LOGIN, linkName: PT.LOGIN },
  { name: PT.DO_NOT_HAVE_ACCOUNT, link: P.SIGNUP, linkName: PT.SIGNUP },
];

export const GO_BACK_BELOW_TEXTS = [{ name: PT.EMPTY, link: P.HOME, linkName: PT.BACK }];
