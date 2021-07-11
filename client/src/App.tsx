import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
    const res = await axios('/signin_get');
    const token = await res.data.token;
    if (token) {
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    handleCheckAuth();
  }, [handleCheckAuth]);

  const commonProps = useMemo(
    () => ({
      isAuth,
      setIsAuth,
    }),
    [isAuth]
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout {...commonProps}>
          <Routes {...commonProps} />
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
