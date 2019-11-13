import React, { Component } from 'react'
import { ContextInfo } from "../../EdgeContext/components/ContextInfo"
import { restoreCachedState } from '../../hmrCache'
import { AccountButtons } from '../../EdgeAccount/components/AccountButtons'
import { AccountInfo } from '../../EdgeAccount/components/AccountInfo.js'
import { WalletInfo } from '../../EdgeWallet/components/WalletInfo.js'
import { WelcomeButtons } from './WelcomeButtons.js'

import * as EdgeContextActions from "../../EdgeContext/actions/EdgeContextActions"
import { connect } from 'react-redux'
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
  }
  /**
  * Creates an EdgeUiContext and saves it in redux-state.
  */
 
  /**
   * Handles logging in.
   */
  async onLogin(account) {
    console.log('Login for', account.username)
    EdgeContextActions.edgeLogin(account);

    // try {
    //   // Find the app wallet, or create one if necessary:
    //   const walletInfo = account.getFirstWalletInfo('wallet:ethereum')
    //   const wallet =
    //     walletInfo == null
    //       ? await account.createCurrencyWallet('wallet:ethereum')
    //       : await account.waitForCurrencyWallet(walletInfo.id)

    //   this.setState({ account, wallet })
    // } catch (e) {
    //   console.error(e)
    // }
  }
 
  /**
   * Logout button was clicked.
   */
  onLogout = () => {
    if (this.state.account) this.state.account.logout()
    this.setState({ account: undefined, wallet: undefined })
  }

  render() {
    const context = this.props.edgeContext
    const account = this.props.edgeAccount

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
    // if (wallet != null && account != null) {
    //   content.push(
    //     <WalletInfo account={this.props.edgeAccount} wallet={this.props.edgeWallet} key="wallet" />
    //   )
    // }
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

    setEdgeContext: (context) => dispatch(EdgeContextActions.setEdgeContext(context)),
    edgeLogin: (edgeAccount) => dispatch(EdgeContextActions.edgeLogin(edgeAccount)),
    edgeLogout: () => dispatch(EdgeContextActions.edgeLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EdgeLoginComponent)
