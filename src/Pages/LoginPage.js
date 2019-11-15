import React from "react"
import { connect } from "react-redux"
import * as EdgeContextActions from "../Features/EdgeContext/actions/EdgeContextActions";

import EdgeLoginComponent from "../Features/EdgeLogin/components/EdgeLoginComponent";

const LoginPage = (props) => {
    return (

        <div>
            <h3>Login Here</h3>
            {props.edgeContext && <EdgeLoginComponent />}

        </div>
    )
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
        setEdgeContext: (context) => dispatch(EdgeContextActions.setEdgeContext(context)),
        edgeLogin: (edgeAccount) => dispatch(EdgeContextActions.edgeLogin(edgeAccount)),
        edgeLogout: () => dispatch(EdgeContextActions.edgeLogout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);