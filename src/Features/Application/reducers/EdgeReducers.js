// Basic App State

var InitialAppState = {
    loggedIn: false,
    edgeAccount: null,
    edgeContext: null,

}

const EdgeAccountReducers = (EdgeState = InitialAppState, action) => {
  switch (action.type) {
    case 'Set_Edge_Context':
      return{
        ...EdgeState, 
        context: action.edgeContext
      }
    case 'Edge_Login':
      return{ 
        ...EdgeState, 
        loggedIn: true,
        edgeAccount : action.edgeAccount
      }
    case 'Edge_Logout':
      return{ 
        ...EdgeState, 
        loggedIn: false,
        edgeAccount: null
      }
    default:
      return EdgeState
  }
}

export default EdgeReducers;