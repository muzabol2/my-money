import styled from "styled-components";
import { alto } from "styles";

const StyledBelowContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  margin: 5px auto 30px;
  padding: 10px 50px 10px;
  border: 1px solid ${alto};
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
`;

const StyledText = styled.p`
  text-align: center;
`;

export { StyledBelowContainer, StyledText };
