import GoogleButton from "react-google-button";
import { useGoogleSignIn } from "hooks";
import { PagesTexts as PT, StatusState as S } from "models";
import { StyledErrorMsg, StyledWrapper } from "./styled";

const GoogleSignIn = () => {
  const { googleSignIn, googleStatus } = useGoogleSignIn();

  if (googleStatus.state === S.PENDING) {
    return <StyledWrapper>{PT.LOADING}</StyledWrapper>;
  }

  return (
    <StyledWrapper>
      <GoogleButton style={{ width: "220px" }} onClick={googleSignIn} />

      {googleStatus.state === S.REJECTED && <StyledErrorMsg>{googleStatus.message}</StyledErrorMsg>}
    </StyledWrapper>
  );
};

export default GoogleSignIn;
