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

export const StyledMenuItem = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: #effaf0;
    border: 1px solid #ddd;
  }
`;

export const StyledDisplayName = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-weight: bold;
`;

export const StyledDivider = styled.hr``;
