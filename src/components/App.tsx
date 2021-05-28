import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// Check jwt in localStorage
// Server validation
// Implement server and db
// Connect frontend to backend using api

// Guard routes

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Arial', '"Apple Color Emoji"'].join(','),
  },
});

const Home = () => {
  return <div>Home</div>;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
