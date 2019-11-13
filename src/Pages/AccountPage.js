import React from "react";
import { AccountButtons } from "../Features/EdgeAccount/components/AccountButtons"
import { AccountInfo } from "../Features/EdgeAccount/components/AccountInfo"
import { connect } from "react-redux"

import { edgeLogout } from "../Features/EdgeContext/actions/EdgeContextActions"
export const AccountPage = (props) => {
    return (
        <div>
            <p>Account Page</p>

            <AccountButtons context={this.props.edgeContext} onLogout={this.props.edgeLogout} />

            <AccountInfo account={this.props.edgeAccount} />

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
        edgeLogout: () => dispatch(edgeLogout)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage)