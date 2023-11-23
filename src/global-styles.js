import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html, body, #root {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
  }

  ul, li, p, h1, h2, h3, h4 {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style-type: none;
  }
`;
