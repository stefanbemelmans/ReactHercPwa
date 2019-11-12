import { makeEdgeUiContext } from 'edge-login-ui-web'
import React, { Component } from 'react'
import { ContextInfo } from "../../Application/components/ContextInfo";
import { restoreCachedState } from '../../hmrCache'
import { AccountButtons } from '../../EdgeAccount/components/AccountButtons.js/index.js'
import { AccountInfo } from '../../EdgeAccount/components/AccountInfo.js'
import { WalletInfo } from '../../EdgeWallet/components/WalletInfo.js'
import { WelcomeButtons } from './WelcomeButtons.js'

import * as ApplicationActions from "../../Application/actions/ApplicationActions";

import { connect } from 'react-redux'

const contextOptions = {
  apiKey: "a9ef0e4134410268a37d833e49990a1b90ec79dc",
  appId: "herc_react_pwa",
  assetsPath: `https://developer.airbitz.co/edge-login-ui-web/iframe/index.html`,
  vendorName: "Hercules",
  vendorImageUrl: "https://s3.us-east-2.amazonaws.com/hercmedia/hLogo.png",
  // plugins: [ethereumCurrencyPluginFactory],
};

/**
 * The top-level component in the demo.
 * Manages the edge context and login state.
 */
class EdgeLoginComponent extends Component {
  constructor(props) {
    super(props)
    // Just use the previous state if the page live-reloads:
    if (restoreCachedState(module, this)) return
    this.state = { account: undefined, context: undefined, wallet: undefined }
    // make the context
    this.makeEdgeContext()
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
  /**
   * Handles logging in.
   */
  async onLogin(account) {
    console.log('Login for', account.username)
    ApplicationActions.edgeLogin(account);
    try {
      // Find the app wallet, or create one if necessary:
      const walletInfo = account.getFirstWalletInfo('wallet:ethereum')
      const wallet =
        walletInfo == null
          ? await account.createCurrencyWallet('wallet:ethereum')
          : await account.waitForCurrencyWallet(walletInfo.id)

      this.setState({ account, wallet })
    } catch (e) {
      console.error(e)
    }
  }
  // TODO: integrate map state to props map dispatch to props
  /**
   * Logout button was clicked.
   */
  onLogout = () => {
    if (this.state.account) this.state.account.logout()
    this.setState({ account: undefined, wallet: undefined })
  }

  render() {
    const { account, context, wallet } = this.state

    // Login / logout buttons:
    const buttons =
      account == null || context == null ? (
        <WelcomeButtons context={context} />
      ) : (
          <AccountButtons
            account={account}
            context={context}
            onLogout={this.onLogout}
          />
        )

    // Content area:
    const content = []
    if (wallet != null && account != null) {
      content.push(
        <WalletInfo account={this.props.edgeAccount} wallet={this.props.edgeWallet} key="wallet" />
      )
    }
    if (this.props.edgeAccount != null) {
      content.push(<AccountInfo account={this.props.edgeAccount} key="account" />)
    }
    if (this.props.edgecontext != null) {
      content.push(<ContextInfo context={this.props.edgecontext} key="context" />)
    }

    return (
      <div id="page">
        <div id="header">Edge Login Demo</div>
        {buttons}
        <div id="content">{content}</div>
      </div>
    )
  }
}

const mapStateToProps = (ApplicationState) => {
  return {
    loggedIn: ApplicationState.loggedIn,
    edgeAccount: ApplicationState.edgeAccount,
    EdgeUiContext: ApplicationState.EdgeContext,
  }

}
const mapDispatchToProps = (dispatch) => {
  return {

    setEdgeContext: (context) => dispatch(ApplicationActions.setEdgeContext(context)),
    edgeLogin: (edgeAccount) => dispatch(ApplicationActions.edgeLogin(edgeAccount)),
    edgeLogout: () => dispatch(ApplicationActions.edgeLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EdgeLoginComponent)
