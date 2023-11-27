import styled from "styled-components";

import { alabaster, eucalyptus, white } from "styles";

export const StyledContainer = styled.div``;

export const StyledMenuButton = styled.button`
  background: none;
  border: 2px solid ${eucalyptus};
  color: ${eucalyptus};
  background-color: ${white};
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    color: ${white};
    background-color: ${eucalyptus};
  }
`;

export const StyledMenu = styled.div`
  position: absolute;
  right: 10px;
  background-color: ${alabaster};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;
