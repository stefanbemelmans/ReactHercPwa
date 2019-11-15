import React, { Component } from "react";
import './App.css';
import { makeEdgeUiContext } from 'edge-login-ui-web'
// import { ContextInfo } from "./Features/EdgeContext/components/ContextInfo"
import { connect } from "react-redux"

import * as EdgeContextActions from "./Features/EdgeContext/actions/EdgeContextActions";
import AuthRoutes from "./Routes/AuthRoutes"
import { HeaderLinks } from "./Features/Application/HeaderLinks";
import { useHistory, withRouter } from "react-router-dom"

// TODO: Add the Ethereum Curecy Plugin
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
    const context = await makeEdgeUiContext(contextOptions)
    console.log("setting Context");
    this.props.setEdgeContext(context)
    

    // Sign up to be notified when the context logs in:
    context.on('login', edgeAccount => this.onLogin(edgeAccount))
  }

  /**
  * Handles logging in. saves the account in redux and redirect to 
  * WalletPage
  */
  onLogin(account) {
    console.log('Login for', account.username)
    this.props.edgeLogin(account);
    useHistory().push("/wallet");
  }

  /**
  * Logout button 
  */
  async onLogout() {
    console.log("Logout for" + this.props.edgeAccount.username)
    this.props.edgeLogout()

  }

  render() {
    console.log(this.props)
    return (
      <div>

        <HeaderLinks />

        {this.props.loggedIn &&
          <button onClick={() => this.onLogout()}>
            Edge Logout
            </button>
        }

        {this.props.loggedIn ? <h3>logged IN</h3> : <h3>Not Logged IN</h3>}

        <AuthRoutes />

      </div>

    )
  }
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
