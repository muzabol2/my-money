import styled from "styled-components";
import { eucalyptus, white } from "styles";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const StyledButton = styled.button`
  margin-top: 25px;
  width: 220px;
  height: 41px;
  background: none;
  border-radius: 5px;
  border: 2px solid ${eucalyptus};
  color: ${eucalyptus};
  background-color: ${white};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: ${white};
    background-color: ${eucalyptus};
  }
`;
