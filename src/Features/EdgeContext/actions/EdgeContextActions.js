// TODO: remove magic strings, install ".env"

export const setEdgeContext = (context) => ({
    type: SET_EDGE_CONTEXT,
    edgeContext: context
})

export const edgeLogin = account => ({
    type: EDGE_LOGIN,
    edgeAccount: account
})

export const edgeLogout = () => ({
    type: EDGE_LOGOUT,
    edgeAccount: null
})

export const SET_EDGE_CONTEXT = "SET_EDGE_CONTEXT"
export const EDGE_LOGIN = "EDGE_LOGIN"
export const EDGE_LOGOUT = "EDGE_LOGOUT"