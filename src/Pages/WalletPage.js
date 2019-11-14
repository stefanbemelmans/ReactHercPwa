import React, { Component } from 'react'
import { connect } from "react-redux"

import { WalletComponent } from "../Features/EdgeWallet/components/WalletComponent"


export const WalletPage = (props) => {
    return (
        <div>

            <p>Wallet Page</p>
            <WalletComponent />

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        edgeAccount: state.edgeAccount,
        edgeContext: state.edgeContext
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // edgeLogout: () => dispatch(edgeLogout)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletPage)