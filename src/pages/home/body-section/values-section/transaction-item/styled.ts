import styled from "styled-components";

import { alto, boulder, concrete, eucalyptus } from "styles";

export const TransactionItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr 0.5fr;
  flex-flow: row wrap;
  gap: 15px 1px;
  margin: 10px auto;
  border: 1px solid ${concrete};
  box-shadow: 3px 3px 5px rgba(50, 50, 50, 0.1);
  padding: 20px;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-left: 4px solid ${eucalyptus};
  color: ${boulder};
`;

export const StyledName = styled.span``;

export const StyledDate = styled.span``;

export const StyledCategory = styled.span``;

export const StyledAmount = styled.span`
  display: flex;
  justify-content: flex-end;
  margin-right: 40px;
  font-weight: bold;
`;

export const StyledDeleteButton = styled.button`
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
