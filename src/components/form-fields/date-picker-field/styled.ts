import styled from "styled-components";

const StyledFormControl = styled.div``;

const StyledLabel = styled.label<{
  $isError: boolean;
}>`
  color: ${({ $isError }) => ($isError ? "red" : "${black}")};
`;

const StyledDateInput = styled.input`
  width: 220px;
  height: 41px;
  border-radius: 5px;
`;

const StyledFormHelperText = styled.div<{
  $isError: boolean;
}>`
  color: ${({ $isError }) => ($isError ? "red" : "inherit")};
`;

export { StyledFormControl, StyledLabel, StyledDateInput, StyledFormHelperText };
