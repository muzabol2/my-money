import styled from "styled-components";
import { alabaster, alto, black, eucalyptus, ottoman, white } from "styles";

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
  top: 50px;
  right: 10px;
  background-color: ${alabaster};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px ${black} rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

export const StyledMenuItem = styled.div`
  color: ${black};
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: ${ottoman};
    border: 1px solid ${alto};
  }
`;

export const StyledDisplayName = styled.div`
  color: ${black};
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-weight: bold;
`;

export const StyledDivider = styled.hr``;
