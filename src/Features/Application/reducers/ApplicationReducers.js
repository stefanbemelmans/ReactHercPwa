// Basic App State

var InitialAppState = {
    LoggedIn: false,
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
        LoggedIn: true,
        edgeAccount : action.edgeAccount
      }
    case 'Edge_Logout':
      return{ 
        ...ApplicationState, 
        LoggedIn: false,
        edgeAccount: null
      }
    default:
      return ApplicationState
  }
}

export default ApplicationReducers;