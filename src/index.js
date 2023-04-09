import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from '~/components/GlobalStyles';
import { Provider } from 'react-redux';
import store from './modules/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GlobalStyle>
      <App />
    </GlobalStyle>
  </Provider>,
);
