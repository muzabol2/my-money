import styled from "styled-components";

export const StyledContainer = styled.div``;

export const StyledMenuButton = styled.button`
  background: none;
  border: 2px solid #1f9751;
  color: #1f9751;
  background-color: #fff;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    color: #fff;
    background-color: #1f9751;
  }
`;

export const StyledMenu = styled.div`
  position: absolute;
  right: 10px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;
