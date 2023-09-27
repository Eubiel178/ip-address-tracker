import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap');

  * {
    font-family:"Rubik";
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    box-sizing: content-box;
  }

  button, input {
    cursor: pointer;
  }
`;

export default GlobalStyle;
