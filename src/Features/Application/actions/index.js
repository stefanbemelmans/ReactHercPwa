
export const edgeLogin = account => ({
  type: 'Edge_Login',
  edgeAccount: account
})

export const edgeLogout = () => ({
    type: 'Edge_Logout',
    edgeAccount: null
  })

