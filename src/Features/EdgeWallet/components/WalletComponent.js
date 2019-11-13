import React from 'react'
import { WalletInfo } from "./WalletInfo" 
import { connect } from 'react-redux'
export const WalletComponent = (props) =>  <WalletInfo account={props.edgeAccount} wallet={props.edgeWallet} key="wallet" />

const mapStateToProps = (state) => {
    return {
      loggedIn: state.loggedIn,
      edgeAccount: state.edgeAccount,
      edgeContext: state.edgeContext,
    }
  
  }

  export default connect(mapStateToProps, null)(WalletComponent)