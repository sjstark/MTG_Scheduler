import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { Provider } from 'react-redux'
import configureStore from './store'

const store = configureStore()

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(',')
  },
  palette: {
    primary: {
      light: "#6fbf73",
      main: "#4caf50",
      dark: "#357a38"
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
          <App />
        </MuiPickersUtilsProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
