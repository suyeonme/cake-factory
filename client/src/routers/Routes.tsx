import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import CakeCollection from '../pages/CakeCollection';
import PageNotFound from '../pages/PageNotFound';

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

const Routes = ({ isAuth, setIsAuth }: any) => (
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
);

export default Routes;
