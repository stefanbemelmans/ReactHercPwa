import React, { Component } from 'react'


import * as EdgeContextActions from "../../EdgeContext/actions/EdgeContextActions"
import { connect } from 'react-redux'


class EdgeLoginComponent extends Component {

  openLoginWindow() {
    console.log("trying to open the window")
    console.log(this.props)

    this.props.edgeContext.showLoginWindow()
  }

  render() {

    return (
      <p id="buttons">

        <button onClick={() => this.openLoginWindow()}>
          Edge Login
          </button>
      </p>
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
    edgeLogin: (edgeAccount) => dispatch(EdgeContextActions.edgeLogin(edgeAccount)),
    edgeLogout: () => dispatch(EdgeContextActions.edgeLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EdgeLoginComponent)
