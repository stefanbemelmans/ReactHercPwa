// Basic App State
import * as EdgeContextActions from "../actions/EdgeContextActions"
var InitialState = {
  loggedIn: false,
  edgeAccount: null,
  edgeContext: null,

}

// Really the only function that deals with context, so I decided to separate it. 
function SetEdgeContextReducer(EdgeContextState = InitialState, action) {
  console.log("inSetcontextRedux", action.type);
  if (action.type === EdgeContextActions.SET_EDGE_CONTEXT) {
    
    return (
      Object.assign({}, EdgeContextState,
        {
          edgeContext: action.edgeContext
        })
    )
  } else {
    return (
      EdgeContextState
    )
  }
}

  function EdgeLoginReducer(EdgeContextState = InitialState, action) {
    switch (action.type) {
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

  export default [SetEdgeContextReducer, EdgeLoginReducer]