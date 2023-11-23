import { PagesTexts as T } from "enums";

import MenuProfilePopup from "../MenuProfilePopup";

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
        <StyledLink to="/">{T.TITLE}</StyledLink>
      </StyledTypography>
      <MenuProfilePopup />
    </StyledToolbar>
  </StyledNavbar>
);

export default Navbar;
