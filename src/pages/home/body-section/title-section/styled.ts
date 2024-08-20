import styled from "styled-components";
import { alto, concrete } from "styles";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr 0.5fr;
  gap: 15px 1px;
  margin: 10px auto;
  border: 1px solid ${concrete};
  box-shadow: 3px 3px 5px rgba(50, 50, 50, 0.1);
  padding: 10px;
`;

const StyledName = styled.span``;

const StyledDate = styled.span`
  margin-left: 20px;
`;

const StyledCategory = styled.span`
  margin-left: 20px;
`;

const StyledAmount = styled.span`
  display: flex;
  justify-content: flex-end;
  margin-right: 40px;
  font-weight: bold;
`;

const StyledDeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: ${alto};
  border: none;
  padding: 12px 8px;
  text-align: center;
  line-height: 0;
  font-size: 0.9em;
  cursor: pointer;
`;

export { StyledContainer, StyledName, StyledDate, StyledCategory, StyledAmount, StyledDeleteButton };
