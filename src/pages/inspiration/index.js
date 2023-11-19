import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { PagesTexts as PT } from "enums";

export default function Inspiration() {
  return (
    <Container>
      <div className="iframe-container">
        <iframe
          width="788.54"
          height="443"
          type="text/html"
          src="https://www.youtube.com/embed/ZomwVcGt0LE?start=37"
          title="Wheres my Money"
        />
      </div>
      <div className="below-container">
        <Typography sx={{ textAlign: "center" }}>
          {PT.HAVE_ACCOUNT} <Link to="login">{PT.LOGIN}</Link>
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          {PT.DO_NOT_HAVE_ACCOUNT} <Link to="signup">{PT.SIGN_UP}</Link>
        </Typography>
      </div>
    </Container>
  );
}
