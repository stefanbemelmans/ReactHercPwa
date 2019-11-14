import React from 'react'
import { WalletInfo } from "./WalletInfo" 
import { connect } from 'react-redux'

export const WalletComponent = (props) => 
(<div><h3>WalletComponent</h3>

<h3>{props.loggedIn}</h3>
<h3>{props.edgeAccount.username}</h3>
</div>)

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    edgeAccount: state.edgeAccount,
    edgeContext: state.edgeContext,
  }
  
}

export default connect(mapStateToProps, null)(WalletComponent)
{/* <WalletInfo account={props.edgeAccount} wallet={props.edgeWallet} key="wallet" /> */}