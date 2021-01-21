import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store'
import reportWebVitals from './reportWebVitals';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Provider } from 'react-redux'

const theme = createMuiTheme({
  palette: {
    type: "light",
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider></Provider>,
  document.getElementById('root')
);

reportWebVitals();
