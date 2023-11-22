import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { StyledBelowContainer, StyledText } from "./styled";

const BelowTextBox = ({ texts }) => (
  <StyledBelowContainer>
    {texts.map(({ name, link, linkName }, index) => (
      <StyledText key={index}>
        {name} <Link to={link}>{linkName}</Link>
      </StyledText>
    ))}
  </StyledBelowContainer>
);

export default BelowTextBox;

BelowTextBox.propTypes = {
  texts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      linkName: PropTypes.string.isRequired,
    })
  ).isRequired,
};
