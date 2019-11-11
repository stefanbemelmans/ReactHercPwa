import React, { Component } from "react";
import './App.css';

import { ContextInfo } from '../../Application/components/ContextInfo.js/index.js'

import { EdgeLoginPage } from "../../../Pages/EdgeLoginPage"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <Router>
        <div>
          <h3><ContextInfo /></h3>
          {/* <EdgeLoginPage /> */}
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/login">Edge Login Page</Link>
            </li>
          </ul>
          
          <Switch>
            <Route path="/public">
              <PublicPage />
            </Route>

            <Route path="/login">
              <EdgeLoginPage />
            </Route>

            <PrivateRoute path="/protected">
              <ProtectedPage />
            </PrivateRoute>
          </Switch>
        </div>
      </Router >
    )
  }
}

const userStatus = {
  isLoggedIn: false,
  authenticate(cb) {
    userStatus.isLoggedIn = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    userStatus.isLoggedIn = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();

  return userStatus.isLoggedIn ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          userStatus.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userStatus.isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    userStatus.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}
 

export default App;
