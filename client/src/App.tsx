import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import CakeCollection from './pages/CakeCollection';
import PageNotFound from './pages/PageNotFound';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Arial', '"Apple Color Emoji"'].join(','),
  },
});

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
  isAuth: boolean;
}> = props => {
  const { path, exact, component, isAuth } = props;

  if (isAuth) {
    return <Route path={path} exact={exact} component={component} />;
  }
  return <Redirect to="/signin" />;
};

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    if (jwt) {
      setIsAuth(true);
    }
  }, []);

  // if not authenticated redirect to signin

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/signin" exact={true} component={Signin} />
          <Route path="/signup" exact={true} component={Signup} />
          <Route path="/collection" exact={true} component={CakeCollection} />
          {/* <PrivateRoute
            path="/collection"
            exact={true}
            component={CakeCollection}
            isAuth={isAuth}
          /> */}
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
