import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 80%;
`;

export const StyledIframeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  max-width: 800px;
`;

export const StyledBelowContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 5px auto 30px;
  padding: 10px 50px 10px;
  border: 1px solid #ddd;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
`;

export const StyledText = styled.p`
  text-align: center;
`;
