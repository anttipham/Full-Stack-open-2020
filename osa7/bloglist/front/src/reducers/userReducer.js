export default (state=null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user
    default:
      return state
  }
}

export const setUserAction = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

