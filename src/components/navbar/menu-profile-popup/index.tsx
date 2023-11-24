import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuthContext, useLogout } from "hooks";
import { AccountCircleIcon } from "icons";
import { PagesTexts as T, RedirectPaths as P } from "enums";

import {
  StyledContainer,
  StyledMenuButton,
  StyledMenu,
  StyledMenuItem,
  StyledDisplayName,
  StyledDivider,
} from "./styled";

const MenuProfilePopup = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // TODO: fix unmounted component warning
  // This is a no-op, but it indicates a memory leak in your application.
  // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

  return (
    <StyledContainer>
      <StyledMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <AccountCircleIcon />
      </StyledMenuButton>
      {isMenuOpen && (
        <StyledMenu>
          <StyledDisplayName>{user.displayName}</StyledDisplayName>
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

export default MenuProfilePopup;
