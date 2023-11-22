import PropTypes from "prop-types";

import {
  StyledLabel,
  StyledLabelContainer,
  StyledLine,
  StyledContainer,
} from "./styled";

const Separator = ({ label }) => (
  <StyledContainer>
    <StyledLine />
    <StyledLabelContainer>
      <StyledLabel>{label}</StyledLabel>
    </StyledLabelContainer>
    <StyledLine />
  </StyledContainer>
);

export default Separator;

Separator.propTypes = {
  label: PropTypes.string.isRequired,
};
