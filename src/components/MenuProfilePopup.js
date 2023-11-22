import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Divider, Tooltip } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import * as React from "react";
import { Link } from "react-router-dom";

import { useAuthContext, useLogout } from "hooks";
import { MenuButton } from "./MenuButton";

const MenuProfilePopup = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <PopupState variant="popover">
      {(popupState) => (
        <React.Fragment>
          <Tooltip title="Settings">
            <MenuButton
              sx={{ border: "2px solid", borderColor: "green" }}
              {...bindTrigger(popupState)}
            >
              <AccountCircleIcon />
            </MenuButton>
          </Tooltip>
          <Menu {...bindMenu(popupState)}>
            <MenuItem disabled sx={{ color: "black", fontWeight: "bold" }}>
              {user.displayName}
            </MenuItem>
            <Divider />
            <MenuItem
              component={Link}
              to={"/categories"}
              onClick={popupState.close}
            >
              Categories
            </MenuItem>
            <MenuItem
              component={Link}
              to={"/updateProfile"}
              onClick={popupState.close}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export default MenuProfilePopup;
