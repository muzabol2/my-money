import { RedirectPaths as P, PagesTexts as PT } from "models";

const SIGNUP_BELOW_TEXTS = [
  { name: PT.HAVE_ACCOUNT, link: P.LOGIN, linkName: PT.LOGIN },
  {
    name: PT.WHY_THIS_PROJECT,
    link: P.INSPIRATION,
    linkName: PT.INSPIRATION,
  },
];

const LOGIN_BELOW_TEXTS = [
  { name: PT.HAVE_ACCOUNT, link: P.SIGNUP, linkName: PT.SIGNUP },
  {
    name: PT.WHY_THIS_PROJECT,
    link: P.INSPIRATION,
    linkName: PT.INSPIRATION,
  },
];

const INSPIRATION_BELOW_TEXTS = [
  { name: PT.HAVE_ACCOUNT, link: P.LOGIN, linkName: PT.LOGIN },
  { name: PT.DO_NOT_HAVE_ACCOUNT, link: P.SIGNUP, linkName: PT.SIGNUP },
];

const GO_BACK_BELOW_TEXTS = [{ name: PT.EMPTY, link: P.HOME, linkName: PT.BACK }];

export { SIGNUP_BELOW_TEXTS, LOGIN_BELOW_TEXTS, INSPIRATION_BELOW_TEXTS, GO_BACK_BELOW_TEXTS };
