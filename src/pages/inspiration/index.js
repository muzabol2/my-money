import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Inspiration() {
  return (
    <Container>
      <div className="iframe-container">
        <iframe
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          width="788.54"
          height="443"
          type="text/html"
          src="https://www.youtube.com/embed/ZomwVcGt0LE?start=37"
          title="Wheres my Money"
        />
      </div>
      <div className="below-container">
        <Typography sx={{ textAlign: "center" }}>
          Have an account? <Link to="login">Login</Link>
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          Do not have an account? <Link to="signup">Sign up</Link>
        </Typography>
      </div>
    </Container>
  );
}
