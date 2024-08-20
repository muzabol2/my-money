import styled from "styled-components";
import { alabaster, eucalyptus, white } from "styles";

export const StyledContainer = styled.div`
  display: grid;
  position: absolute;
  top: 50px;
  right: 60px;
  background-color: ${alabaster};
  border-radius: 10px;
  border: 2px solid ${eucalyptus};
  width: 220;
  max-width: 220px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 10;
  padding: 16px;
`;

export const StyledGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
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
