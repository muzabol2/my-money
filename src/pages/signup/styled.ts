import styled from "styled-components";

export const StyledWrapper = styled.div``;

export const StyledFormContainer = styled.div`
  display: grid;
  align-items: center;
  max-width: 250px;
  margin: 5px auto 5px;
  padding: 40px 50px 40px;
  border: 1px solid #ddd;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
`;

export const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const StyledTitle = styled.h3`
  text-align: center;
  font-family: Arial;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const StyledErrorMsg = styled.p`
  margin-top: 20px;
  color: red;
`;

export const StyledSuccessMsg = styled.p`
  margin-top: 20px;
  color: #1f9751;
  font-weight: bold;
`;