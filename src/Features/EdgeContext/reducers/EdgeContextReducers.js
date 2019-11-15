// Basic App State
import * as EdgeContextActions from "../actions/EdgeContextActions"
var InitialState = {
  loggedIn: false,
  edgeAccount: null,
  edgeContext: null,

}

function EdgeLoginReducer(EdgeContextState = InitialState, action) {
  switch (action.type) {
    case EdgeContextActions.SET_EDGE_CONTEXT:
      return Object.assign({}, EdgeContextState,
        {
          ...EdgeContextState,
          edgeContext: action.edgeContext
        })
    case EdgeContextActions.EDGE_LOGIN:
      return Object.assign({}, EdgeContextState,
        {
          ...EdgeContextState,
          loggedIn: true,
          edgeAccount: action.edgeAccount
        })
    case EdgeContextActions.EDGE_LOGOUT:
      return Object.assign({}, EdgeContextState,
        {
          ...EdgeContextState,
          loggedIn: false,
          edgeAccount: null
        })
    default:
      return EdgeContextState
  }
}

export default EdgeLoginReducer