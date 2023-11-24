import styled from "styled-components";

const StyledBox = styled.div`
  justify-content: flex-end;
  padding: 5px 20px;
  display: flex;
  font-weight: bold;
`;

export const GridFooterTotal = ({ total }: { total: number }) => (
  <StyledBox>{`Total : ${total.toFixed(2)}`}</StyledBox>
);
