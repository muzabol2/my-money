import styled from "styled-components";
import { alto, eucalyptus, white } from "styles";

const StyledWrapper = styled.div``;

const StyledFormContainer = styled.div`
  max-width: 250px;
  margin: 30px auto 5px;
  padding: 40px 50px 30px;
  border: 1px solid ${alto};
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StyledTitle = styled.h3`
  text-align: center;
  font-family: Arial;
  font-weight: bold;
  margin-bottom: 8px;
`;

const StyledErrorMsg = styled.p`
  margin-top: 20px;
  color: red;
`;

const StyledList = styled.ul`
  display: grid;
  list-style: none;
  padding: 0;
`;

const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 30px;
  justify-content: space-between;
  padding: 10px;
`;

const StyledIconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledListItemText = styled.span``;

const StyledInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
`;

const StyledButton = styled.button`
  width: 60px;
  height: 56px;
  background: none;
  border-radius: 4px;
  border: 2px solid ${eucalyptus};
  color: ${eucalyptus};
  background-color: ${white};
  font-weight: bold;

  &:hover {
    color: ${white};
    background-color: ${eucalyptus};
  }
`;

export {
  StyledWrapper,
  StyledFormContainer,
  StyledContainer,
  StyledTitle,
  StyledErrorMsg,
  StyledList,
  StyledListItem,
  StyledIconButton,
  StyledListItemText,
  StyledInputContainer,
  StyledButton,
};
