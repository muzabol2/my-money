import styled from "styled-components";

import { alto, eucalyptus, white } from "styles";

export const StyledWrapper = styled.div``;

export const StyledFormContainer = styled.div`
  display: grid;
  align-items: center;
  max-width: 250px;
  margin: 5px auto 5px;
  padding: 40px 50px 40px;
  border: 1px solid ${alto};
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
`;

export const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const StyledTitle = styled.h3`
  text-align: center;
  font-family: Arial;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const StyledSubtitle = styled.h4`
  text-align: center;
  font-family: Monospace;
  margin: 8px;
`;

export const StyledErrorMsg = styled.p`
  margin-top: 20px;
  color: red;
`;

export const StyledSuccessMsg = styled.p`
  margin-top: 20px;
  color: ${eucalyptus};
  font-weight: bold;
`;

export const StyledButton = styled.button`
  width: 220px;
  height: 50px;
  background: none;
  border-radius: 5px;
  border: 2px solid ${eucalyptus};
  color: ${eucalyptus};
  background-color: ${white};
  font-weight: bold;

  &:hover {
    color: ${white};
    background-color: ${eucalyptus};
  }
`;
