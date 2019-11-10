
import React, { Component } from 'react'

export class AccountButtons extends Component {
  
  openManageWindow = () => {
    this.props.context.showAccountSettingsWindow(this.props.account)
  }

  render() {
    return (
      <p id="buttons">
        <button onClick={this.openManageWindow}>Manage Settings</button>
        <button className="secondary" onClick={this.props.onLogout}>
          Logout
        </button>
      </p>
    )
  }
}
