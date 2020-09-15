import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from './services/theme';
import history from './services/history';
import store from './services/store';
import { ThemeProvider } from '@material-ui/styles';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </Router>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
