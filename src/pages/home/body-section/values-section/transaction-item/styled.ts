import styled from "styled-components";

export const TransactionItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr 0.5fr;
  flex-flow: row wrap;
  gap: 15px 1px;
  margin: 10px auto;
  border: 1px solid #f2f2f2;
  box-shadow: 3px 3px 5px rgba(50, 50, 50, 0.1);
  padding: 20px;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-left: 4px solid #1f9751;
  color: #777;
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
  background: #ddd;
  border: none;
  padding: 12px 8px;
  text-align: center;
  line-height: 0;
  font-size: 0.9em;
  cursor: pointer;
`;
