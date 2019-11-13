// Basic App State
// import * as EdgeContextActionCreators from "../actions/EdgeContextActions"
var EdgeContextState = {
    loggedIn: false,
    edgeAccount: null,
    edgeContext: null,

}

const EdgeContextReducers = (EdgeContextState, action) => {
  switch (action.type) {
    case 'Set_Edge_Context':
      return{
        ...EdgeContextState, 
        edgeContext: action.edgeContext
      }
    case 'Edge_Login':
      return{ 
        ...EdgeContextState, 
        loggedIn: true,
        edgeAccount : action.edgeAccount
      }
    case 'Edge_Logout':
      return{ 
        ...EdgeContextState, 
        loggedIn: false,
        edgeAccount: null
      }
    default:
      return EdgeContextState
  }
}

export default EdgeContextReducers;