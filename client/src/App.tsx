import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Routes from './routers/Routes';
import Layout from './components/Layout/Layout';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Arial', '"Apple Color Emoji"'].join(','),
  },
});

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  const handleCheckAuth = useCallback(async () => {
    const res = await axios('/jwt_get');
    const token = await res.data.token;
    if (token) {
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    handleCheckAuth();
  }, [handleCheckAuth]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout setIsAuth={setIsAuth}>
          <Routes isAuth={isAuth} setIsAuth={setIsAuth} />
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
