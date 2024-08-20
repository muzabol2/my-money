import { RedirectPaths as P, PagesTexts as T } from "models";
import MenuProfilePopup from "./menu-profile-popup";
import { StyledLink, StyledNavbar, StyledOptions, StyledToolbar, StyledTypography } from "./styled";
import TransactionPlus from "./transaction-plus";

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
