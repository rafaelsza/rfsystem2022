import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    //color: #E1E1E6; // for dark theme
    color: #0d0d0d; // for light theme
  }
`;

export default GlobalStyle;
