import React, { Component } from 'react'
import { restoreCachedState } from '../../hmrCache'

import { WelcomeButtons } from './WelcomeButtons.js'

import * as EdgeContextActions from "../../EdgeContext/actions/EdgeContextActions"
import { connect } from 'react-redux'


class EdgeLoginComponent extends Component {
  /**
   * Handles logging in.
   */
  async onLogin(account) {
    console.log('Login for', account.username)
  }
  /**
   * Logout button was clicked.
   */
  onLogout = () => {
    if (this.state.account) this.state.account.logout()
    this.setState({ account: undefined, wallet: undefined })
  }

  openLoginWindow() {
    console.log("trying to open the window")
    console.log(this.props)
    
      // this.props.edgeContext.showLoginWindow()
  }

  render() {

    return (
      <p id="buttons">

        <button onClick={() => this.openLoginWindow()}>
          Login With Edge
          </button>
      </p>
    )

  }
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
    edgeLogin: (edgeAccount) => dispatch(EdgeContextActions.edgeLogin(edgeAccount)),
    edgeLogout: () => dispatch(EdgeContextActions.edgeLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EdgeLoginComponent)
