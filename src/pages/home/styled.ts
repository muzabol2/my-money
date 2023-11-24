import styled from "styled-components";

export const StyledContainer = styled.div`
  margin: 0 auto;
  padding-right: 16px;
  padding-left: 16px;
  width: 100%;

  @media (min-width: 600px) {
    max-width: 960px;
  }

  @media (min-width: 960px) {
    max-width: 1280px;
  }
`;
