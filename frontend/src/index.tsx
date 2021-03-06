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
import { Provider } from 'react-redux';
import { store } from './store';
import { QueryClient, QueryClientProvider } from 'react-query';

const CustomGlobalStyles = createGlobalStyle`
  body {
    ${tw`bg-gray-light font-roboto`}
  }
`;

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <CustomGlobalStyles />
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
);
