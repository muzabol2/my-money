import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "context";
import { useLogout } from "hooks";
import { AccountCircleIcon } from "icons";
import { RedirectPaths as P, PagesTexts as T } from "models";
import {
  StyledContainer,
  StyledDisplayName,
  StyledDivider,
  StyledMenu,
  StyledMenuButton,
  StyledMenuItem,
} from "./styled";

const MenuProfilePopup = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //cleanup function
  useEffect(() => () => setIsMenuOpen(true), []);

  return (
    <StyledContainer>
      <StyledMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <AccountCircleIcon />
      </StyledMenuButton>
      {isMenuOpen && (
        <StyledMenu>
          <StyledDisplayName>{user?.displayName}</StyledDisplayName>
          <StyledDivider />
          <StyledMenuItem as={Link} to={P.CATEGORIES}>
            {T.CATEGORIES}
          </StyledMenuItem>
          <StyledMenuItem as={Link} to={P.UPDATE_PROFILE}>
            {T.PROFILE}
          </StyledMenuItem>
          <StyledMenuItem onClick={logout}>{T.LOGOUT}</StyledMenuItem>
        </StyledMenu>
      )}
    </StyledContainer>
  );
};

export { MenuProfilePopup };
