import React from "react";
import { Link } from "react-router-dom";

import { StyledBelowContainer, StyledText } from "./styled";

interface TextItem {
  name: string;
  link: string;
  linkName: string;
}

interface Props {
  texts: TextItem[];
}

// eslint-disable-next-line react-refresh/only-export-components
const BelowTextBox = ({ texts }: Props) => (
  <StyledBelowContainer>
    {texts.map(({ name, link, linkName }, index) => (
      <StyledText key={index}>
        {name} <Link to={link}>{linkName}</Link>
      </StyledText>
    ))}
  </StyledBelowContainer>
);

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(BelowTextBox);
