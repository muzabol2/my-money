import styled from "styled-components";

export const StyledContainer = styled.div`
  display: grid;
  position: absolute;
  top: 50px;
  right: 60px;
  background-color: #f9f9f9;
  border-radius: 10px;
  border: 2px solid #1f9751;
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
