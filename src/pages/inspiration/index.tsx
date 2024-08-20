import { BelowTextBox } from "components";
import { INSPIRATION_BELOW_TEXTS } from "consts";
import { RedirectPaths as P } from "models";
import { StyledContainer, StyledIframe, StyledIframeContainer } from "./styled";

const Inspiration = () => (
  <StyledContainer>
    <StyledIframeContainer>
      <StyledIframe src={P.YOUTUBE_LINK} title={P.YOUTUBE_LINK} allowFullScreen />
    </StyledIframeContainer>

    <BelowTextBox texts={INSPIRATION_BELOW_TEXTS} />
  </StyledContainer>
);

export { Inspiration };
