import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import axios from 'axios';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import CakeCollection from './pages/CakeCollection';
import PageNotFound from './pages/PageNotFound';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Arial', '"Apple Color Emoji"'].join(','),
  },
});

interface PrivateRouteProps {
  isAuth: boolean;
  path: string;
  exact: any;
  component: React.FC;
}

const PrivateRoute = ({
  isAuth,
  path,
  exact,
  component,
}: PrivateRouteProps) => {
  return isAuth ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to="/signin" />
  );
};

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
        <Link to="/collection">Collection</Link>
        <Link to="/">Home</Link>

        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route
            path="/signin"
            exact={true}
            component={() => <Signin setIsAuth={setIsAuth} />}
          />
          <Route
            path="/signup"
            exact={true}
            component={() => <Signup setIsAuth={setIsAuth} />}
          />
          <PrivateRoute
            path="/collection"
            exact={true}
            component={CakeCollection}
            isAuth={isAuth}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
