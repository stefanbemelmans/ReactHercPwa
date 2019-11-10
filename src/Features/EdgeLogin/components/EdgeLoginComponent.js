import { makeEdgeUiContext } from 'edge-login-ui-web'
import React, { Component } from 'react'

import { restoreCachedState } from '../../hmrCache'
import { AccountButtons } from './AccountButtons.js'
import { AccountInfo } from './AccountInfo.js'
import { ContextInfo } from './ContextInfo.js'
import { WalletInfo } from './WalletInfo.js'
import { WelcomeButtons } from './WelcomeButtons.js'


// TODO: remove magic strings
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
export class EdgeLoginComponent extends Component {
  constructor(props) {
    super(props)
    // Just use the previous state if the page live-reloads:
    if (restoreCachedState(module, this)) return
    this.state = { account: undefined, context: undefined, wallet: undefined }
    // make the context
    this.makeEdgeContext()
  }
  /**
   * Creates an EdgeUiContext and saves it in state.
   */

  async makeEdgeContext() {
    // Make the context:
    const context = await makeEdgeUiContext(contextOptions)
    this.setState({ context })

    // Sign up to be notified when the context logs in:
    context.on('login', edgeAccount => this.onLogin(edgeAccount))
  }

  /**
   * Handles logging in.
   */
  async onLogin(account) {
    console.log('Login for', account.username)
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
        <WalletInfo account={account} wallet={wallet} key="wallet" />
      )
    }
    if (account != null) {
      content.push(<AccountInfo account={account} key="account" />)
    }
    if (context != null) {
      content.push(<ContextInfo context={context} key="context" />)
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
