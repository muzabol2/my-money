import styled from "styled-components";
import { silver } from "styles";

export const StyledFormControl = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTextField = styled.input<{
  isError: boolean;
}>`
  width: 220px;
  padding: 12px;
  border: 1px solid ${silver};
  border-radius: 4px;
  background-color: white;
  box-sizing: border-box;
  ${({ isError }) =>
    isError &&
    `
    border-color:  "red";
    color: "red";
    `}
`;

export const StyledFormHelperText = styled.div`
  color: red;
  font-size: 12px;
`;

export const StyledLabel = styled.label<{
  isError: boolean;
}>`
  color: ${({ isError }) => (isError ? "red" : "${black}")};
`;
