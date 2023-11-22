import { BelowTextBox } from "components";
import { PagesTexts as T, RedirectPaths as P } from "enums";

import { StyledContainer, StyledIframeContainer, StyledIframe } from "./styled";

const Inspiration = () => {
  const inspirationBelowTexts = [
    { name: T.HAVE_ACCOUNT, link: P.LOGIN, linkName: T.LOGIN },
    { name: T.DO_NOT_HAVE_ACCOUNT, link: P.SIGNUP, linkName: T.SIGNUP },
  ];

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
      <BelowTextBox texts={inspirationBelowTexts} />
    </StyledContainer>
  );
};

export default Inspiration;
