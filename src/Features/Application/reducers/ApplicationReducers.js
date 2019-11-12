// Basic App State

var InitialAppState = {
    loggedIn: false,
    edgeAccount: null,
    edgeContext: null,

}

const ApplicationReducers = (ApplicationState = InitialAppState, action) => {
  switch (action.type) {
    case 'Set_Edge_Context':
      return{
        ...ApplicationState, 
        context: action.edgeContext
      }
    case 'Edge_Login':
      return{ 
        ...ApplicationState, 
        loggedIn: true,
        edgeAccount : action.edgeAccount
      }
    case 'Edge_Logout':
      return{ 
        ...ApplicationState, 
        loggedIn: false,
        edgeAccount: null
      }
    default:
      return ApplicationState
  }
}

export default ApplicationReducers;