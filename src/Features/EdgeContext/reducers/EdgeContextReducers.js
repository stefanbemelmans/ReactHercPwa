// Basic App State
// import * as EdgeContextActionCreators from "../actions/EdgeContextActions"
var InitialState = {
  loggedIn: false,
  edgeAccount: null,
  edgeContext: null,

}

// Really the only function that deals with context, so I decided to separate it. 
function SetEdgeContextReducer(EdgeContextState = InitialState, action) {

  return action.type === "Set_Edge_Context" ?
    Object.assign({}, EdgeContextState,
      {
        ...EdgeContextState,
        edgeContext: action.edgeContext
      })
    :
    EdgeContextState
}


function EdgeLoginReducer(EdgeContextState = InitialState, action) {
  switch (action.type) {
    case 'Edge_Login':
      return Object.assign({}, EdgeContextState,
        {
          ...EdgeContextState,
          loggedIn: true,
          edgeAccount: action.edgeAccount
        })
    case 'Edge_Logout':
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