import styled from "styled-components";
import { alto } from "styles";

const StyledWrapper = styled.div``;

const StyledFormContainer = styled.div`
  display: grid;
  align-items: center;
  max-width: 250px;
  margin: 5px auto 5px;
  padding: 40px 50px 40px;
  border: 1px solid ${alto};
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
`;

const StyledTitle = styled.h3`
  text-align: center;
  font-family: Arial;
  font-weight: bold;
  margin-bottom: 8px;
`;

const StyledText = styled.h4`
  text-align: center;
  font-family: Monospace;
  margin: 8px;
`;

export { StyledWrapper, StyledFormContainer, StyledTitle, StyledText };
