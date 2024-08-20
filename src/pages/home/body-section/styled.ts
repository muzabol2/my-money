import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    margin: 0 100px 0;
  }
`;

const StyledSumHeader = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledItems = styled.ul``;

export { StyledContainer, StyledSumHeader, StyledItems };
