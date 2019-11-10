
var initialApplicationState = {
    LoggedIn: false,
    edgeAccount: null,
}

const ApplicationState = (state = initialApplicationState, action) => {
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
      return state
  }
}

export default ApplicationState;