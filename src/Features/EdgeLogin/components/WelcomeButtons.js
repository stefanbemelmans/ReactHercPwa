import React, { Component } from 'react'

export class WelcomeButtons extends Component {
 
  openLoginWindow = () => {
    if (this.props.context) {
      this.props.context.showLoginWindow()
    }
  }

  render() {
    return (
      <p id="buttons">
        <button disabled={!this.props.context} onClick={this.openLoginWindow}>
          Login With Edge
        </button>
      </p>
    )
  }
}
