import React from "react";
import { connect } from "react-redux"

const HomePage = (props) => {
    return (
        <div>
            <p>HomePage Page</p>
            <h3>Whattup!</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)