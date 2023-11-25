import styled from "styled-components";

export const StyledWrapper = styled.div``;

export const StyledFormContainer = styled.div`
  max-width: 250px;
  margin: 30px auto 5px;
  padding: 40px 50px 30px;
  border: 1px solid #ddd;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
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

export const StyledErrorMsg = styled.p`
  margin-top: 20px;
  color: red;
`;

export const StyledList = styled.ul`
  display: grid;
  list-style: none;
  padding: 0;
`;

export const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 30px;
  justify-content: space-between;
  padding: 10px;
`;

export const StyledIconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const StyledListItemText = styled.span``;

export const StyledInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
`;

export const StyledButton = styled.button`
  width: 60px;
  height: 56px;
  background: none;
  border-radius: 4px;
  border: 2px solid #1f9751;
  color: #1f9751;
  background-color: #fff;
  font-weight: bold;

  &:hover {
    color: #fff;
    background-color: #1f9751;
  }
`;
