
var InitialAppState = {
    LoggedIn: false,
    edgeAccount: null,
}

// Basic App State

const ApplicationReducers = (ApplicationState = InitialAppState, action) => {
  switch (action.type) {
    case 'Edge_Login':
      return{ 
        LoggedIn: true,
        edgeAccount : action.edgeAccount
      }
    case 'Edge_Logout':
      return{ 
        LoggedIn: false,
        edgeAccount: null
      }
    default:
      return ApplicationState
  }
}

export default ApplicationReducers;