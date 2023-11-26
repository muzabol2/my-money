import styled from "styled-components";

export const StyledFormControl = styled.div``;

export const StyledTextField = styled.input<{
  isError: boolean;
}>`
  width: 220px;
  padding: 12px;
  border: 1px solid #ccc;
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
  color: ${({ isError }) => (isError ? "red" : "black")};
`;
