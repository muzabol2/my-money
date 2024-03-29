import styled from "styled-components";

export const StyledFormControl = styled.div``;

export const StyledInputLabel = styled.label``;

export const StyledSelect = styled.select`
  width: 220px;
  height: 41px;
  border-radius: 5px;
`;

export const StyledOption = styled.option``;

export const StyledFormHelperText = styled.div<{
  isError: boolean;
}>`
  color: ${({ isError }) => (isError ? "red" : "inherit")};
`;
