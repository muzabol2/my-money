import styled from "styled-components";

const StyledFormControl = styled.div``;

const StyledInputLabel = styled.label``;

const StyledSelect = styled.select`
  width: 220px;
  height: 41px;
  border-radius: 5px;
`;

const StyledOption = styled.option``;

const StyledFormHelperText = styled.div<{ $isError: boolean }>`
  color: ${({ $isError }) => ($isError ? "red" : "inherit")};
`;

export { StyledFormControl, StyledInputLabel, StyledSelect, StyledOption, StyledFormHelperText };
