import { PagesTexts as T, RedirectPaths as P } from "enums";

import MenuProfilePopup from "./menu-profile-popup";

import {
  StyledNavbar,
  StyledToolbar,
  StyledLink,
  StyledTypography,
} from "./styled";

const Navbar = () => (
  <StyledNavbar>
    <StyledToolbar>
      <StyledTypography>
        <StyledLink to={P.HOME}>{T.TITLE}</StyledLink>
      </StyledTypography>
      <MenuProfilePopup />
    </StyledToolbar>
  </StyledNavbar>
);

export default Navbar;
