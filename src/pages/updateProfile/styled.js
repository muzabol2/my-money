import styled from "styled-components";

export const StyledWrapper = styled.div``;

export const StyledFormContainer = styled.div`
  max-width: 250px;
  margin: 30px auto 5px;
  padding: 40px 50px 30px;
  border: 1px solid #ddd;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
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
