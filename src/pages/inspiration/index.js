import { Link } from "react-router-dom";

import { PagesTexts as T, RedirectPaths as P } from "enums";

import {
  StyledContainer,
  StyledBelowContainer,
  StyledIframeContainer,
  StyledIframe,
  StyledText,
} from "./styled";

export default function Inspiration() {
  return (
    <StyledContainer>
      <StyledIframeContainer>
        <StyledIframe
          src={P.YOUTUBE_LINK}
          title={P.YOUTUBE_LINK}
          type="text/html"
          frameborder="0"
          allowFullScreen
        />
      </StyledIframeContainer>
      <StyledBelowContainer>
        <StyledText>
          {T.HAVE_ACCOUNT} <Link to={P.LOGIN}>{T.LOGIN}</Link>
        </StyledText>
        <StyledText>
          {T.DO_NOT_HAVE_ACCOUNT} <Link to={P.SIGNUP}>{T.SIGNUP}</Link>
        </StyledText>
      </StyledBelowContainer>
    </StyledContainer>
  );
}
