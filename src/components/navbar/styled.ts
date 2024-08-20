import { Link } from "react-router-dom";
import styled from "styled-components";
import { alto, black, ottoman } from "styles";

const StyledNavbar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${ottoman};
  color: ${black};
  border-bottom: 1px solid ${alto};
`;

const StyledToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

const StyledOptions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const StyledTypography = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${black};
  font-weight: bold;
`;

export { StyledNavbar, StyledToolbar, StyledOptions, StyledTypography, StyledLink };
