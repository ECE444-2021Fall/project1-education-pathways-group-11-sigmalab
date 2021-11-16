import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/400-italic.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import * as types from 'styled-components/cssprop';
import App from './App';
import tw, { GlobalStyles } from 'twin.macro';
import { createGlobalStyle } from 'styled-components';
import { CookiesProvider } from 'react-cookie';

const CustomGlobalStyles = createGlobalStyle`
  body {
    ${tw`bg-gray-light font-roboto`}
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <CustomGlobalStyles />
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
