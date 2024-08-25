import styled from "styled-components";
import { silver } from "styles";

const StyledFormControl = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTextField = styled.input<{ hasError: boolean }>`
  width: 220px;
  padding: 12px;
  border: 1px solid ${silver};
  border-radius: 4px;
  background-color: white;
  box-sizing: border-box;
  ${({ hasError }) => hasError && "border-color: 'red'; color: 'red';"}
`;

const StyledFormHelperText = styled.div`
  color: red;
  font-size: 12px;
`;

const StyledLabel = styled.label<{ hasError: boolean }>`
  color: ${({ hasError }) => (hasError ? "red" : "${black}")};
`;

export { StyledFormControl, StyledTextField, StyledFormHelperText, StyledLabel };
