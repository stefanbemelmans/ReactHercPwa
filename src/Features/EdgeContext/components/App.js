import React, { Component } from "react";
import './App.css';
import { makeEdgeUiContext } from 'edge-login-ui-web'
import { ContextInfo } from "./ContextInfo"
import { connect } from "react-redux"
import  EdgeLoginComponent  from "../../EdgeLogin/components/EdgeLoginComponent";
import * as EdgeContextActions from "../actions/EdgeContextActions";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const contextOptions = {
  apiKey: "a9ef0e4134410268a37d833e49990a1b90ec79dc",
  appId: "herc_react_pwa",
  assetsPath: `https://developer.airbitz.co/edge-login-ui-web/iframe/index.html`,
  vendorName: "Hercules",
  vendorImageUrl: "https://s3.us-east-2.amazonaws.com/hercmedia/hLogo.png",
  // plugins: [ethereumCurrencyPluginFactory],
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localUsers: 3
    }
    this.makeEdgeContext();
  }
 /**
  * Creates an EdgeUiContext and saves it in redux-state.
  */
 
  async makeEdgeContext() {
    // Make the context:
    const context = await makeEdgeUiContext(contextOptions)
    console.log("setting Context");
    this.props.setEdgeContext(context)

    // Sign up to be notified when the context logs in:
    context.on('login', edgeAccount => this.onLogin(edgeAccount))
  }
  render() {

    return (
      <Router>
        <div>
          <h3>
            <ContextInfo context={this.props.edgeContext} />
          </h3>
         
          ({this.props.edgeContext}
          <EdgeLoginComponent context={this.props.edgeContext} />
          )
        
        
         {/*  refactor to have the login page 
          if unauth and wallet page if auth */}
          
          <Switch>
            <PrivateRoute path="/protected">
           
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
 
const mapStateToProps = (EdgeContextState) => {
  return {
    loggedIn: EdgeContextState.loggedIn,
    edgeAccount: EdgeContextState.edgeAccount,
    edgeContext: EdgeContextState.EdgeContext,
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    setEdgeContext: (context) => dispatch(EdgeContextActions.setEdgeContext(context)),
    edgeLogin: (edgeAccount) => dispatch(EdgeContextActions.edgeLogin(edgeAccount)),
    edgeLogout: () => dispatch(EdgeContextActions.edgeLogout())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
