// TODO: remove magic strings, install ".env"

export const setEdgeContext = context => 
({
    type: 'Set_Edge_Context',
    edgeContext: context
})

export const edgeLogin = account => ({
    type: 'Edge_Login',
    edgeAccount: account
})


export const edgeLogout = () => ({
    type: 'Edge_Logout',
    edgeAccount: null
})

