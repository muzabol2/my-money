import { PagesTexts as T, RedirectPaths as P } from "enums";

import TransactionPlus from "./transaction-plus";
import MenuProfilePopup from "./menu-profile-popup";

import {
  StyledNavbar,
  StyledToolbar,
  StyledLink,
  StyledTypography,
  StyledOptions,
} from "./styled";

const Navbar = () => (
  <StyledNavbar>
    <StyledToolbar>
      <StyledTypography>
        <StyledLink to={P.HOME}>{T.TITLE}</StyledLink>
      </StyledTypography>
      <StyledOptions>
        <TransactionPlus />
        <MenuProfilePopup />
      </StyledOptions>
    </StyledToolbar>
  </StyledNavbar>
);

export default Navbar;
