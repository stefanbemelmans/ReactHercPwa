import React, { Component } from "react";
import './App.css';
import { makeEdgeUiContext } from 'edge-login-ui-web'
import { ContextInfo } from "./Features/EdgeContext/components/ContextInfo"
import { connect } from "react-redux"
import  EdgeLoginComponent  from "./Features/EdgeLogin/components/EdgeLoginComponent";
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
  * Creates an EdgeUiContext and saves it in state.
  */
  async makeEdgeContext() {
    // Make the context:
    const context = await makeEdgeUiContext(contextOptions)
    console.log("setting Context");
    this.props.setEdgeContext(context)
    this.setState({edgeContext: context})

    // Sign up to be notified when the context logs in:
    context.on('login', edgeAccount => this.onLogin(edgeAccount))
  }

 async onLogin(account) {
    console.log('Login for', account.username)
    this.props.edgeLogin(account)
    this.setState({account})
  }

  render() {
    console.log(this.props)
    return (
      <Router>
        <div>
          <h3>
            <ContextInfo context={this.state.edgeContext} />
          </h3>
         
    {this.state.edgeContext && <EdgeLoginComponent context={this.state.edgeContext} /> }
        
                
          
          <Switch>
            <PrivateRoute path="/protected">
           
            </PrivateRoute>
          </Switch>

        </div>
      </Router >
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
        this.state.account ? (
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
