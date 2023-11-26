import styled from "styled-components";

export const StyledFormControl = styled.div``;

export const StyledLabel = styled.label<{
  isError: boolean;
}>`
  color: ${({ isError }) => (isError ? "red" : "black")};
`;

export const StyledDateInput = styled.input`
  width: 220px;
  height: 41px;
  border-radius: 5px;
`;

export const StyledFormHelperText = styled.div<{
  isError: boolean;
}>`
  color: ${({ isError }) => (isError ? "red" : "inherit")};
`;
