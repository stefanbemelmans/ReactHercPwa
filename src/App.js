import React, { Component } from "react";
import './App.css';
import { makeEdgeUiContext } from 'edge-login-ui-web'
import { ContextInfo } from "./Features/EdgeContext/components/ContextInfo"
import { connect } from "react-redux"
import EdgeLoginComponent from "./Features/EdgeLogin/components/EdgeLoginComponent";
import * as EdgeContextActions from "./Features/EdgeContext/actions/EdgeContextActions";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { WalletComponent } from "./Features/EdgeWallet/components/WalletComponent";

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
      localUsers: 3,
      edgeContext: null,
      account: null
    }

    this.makeEdgeContext();
  }

  /**
  * Creates an EdgeUiContext and saves it in redux.
  */
  async makeEdgeContext() {
    // Make the context:
    const context = await makeEdgeUiContext(contextOptions)
    console.log("setting Context");
    this.props.setEdgeContext(context)
    this.setState({ edgeContext: context })

    // Sign up to be notified when the context logs in:
    context.on('login', edgeAccount => this.onLogin(edgeAccount))
  }

  /**
  * Handles logging in. saves the account in redux and redirect to 
  * WalletPage
  */
  async onLogin(account) {
    console.log('Login for', account.username)
    this.props.edgeLogin(account);
    return  <Redirect to="./wallet" />
  }

  /**
  * Logout button was clicked.
  */
  async onLogout() {
    console.log("Logout for" + this.props.edgeAccount.username)
    this.props.edgeLogout()

  }

  render() {
    console.log(this.props)
    return (
      <Router>
        <div>
          <h3>
            <ContextInfo context={this.props.edgeContext} />
          </h3>
          {this.props.loggedIn &&
            <button onClick={() => this.onLogout()}>
            Edge Logout
            </button> }
          {this.props.edgeContext && <EdgeLoginComponent />}



          <Switch>
            <PrivateRoute path="/Wallet">
              <WalletComponent />
            </PrivateRoute>
          </Switch>

        </div>
      </Router>
    )
  }
}


// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        this.props.loggedIn ? (
          <WalletComponent />
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    edgeAccount: state.edgeAccount,
    edgeContext: state.edgeContext,
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
