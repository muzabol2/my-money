import {
  StyledLabel,
  StyledLabelContainer,
  StyledLine,
  StyledContainer,
} from "./styled";

const Separator = ({ label }: { label: string }) => (
  <StyledContainer>
    <StyledLine />
    <StyledLabelContainer>
      <StyledLabel>{label}</StyledLabel>
    </StyledLabelContainer>
    <StyledLine />
  </StyledContainer>
);

export default Separator;
