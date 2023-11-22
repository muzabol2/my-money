import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { PagesTexts as T } from "enums";
import MenuProfilePopup from "./MenuProfilePopup";

const Navbar = () => (
  <AppBar sx={{ backgroundColor: "#effaf0", color: "black" }}>
    <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
      <Typography variant="h6" component="div">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "bold",
          }}
        >
          {T.TITLE}
        </Link>
      </Typography>
      <MenuProfilePopup />
    </Toolbar>
  </AppBar>
);

export default Navbar;
