import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledNavbar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #effaf0;
  color: black;
  border-bottom: 1px solid #ddd;
`;

export const StyledToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

export const StyledTypography = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
`;
