export default (state='', action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.message
    default:
      return state
  }
}

// action creatorit
let timeoutID
export const setNotificationAction = (message) => {
  return (dispatch) => {
    dispatch({
      type: 'NOTIFICATION',
      message: message
    })
  
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        message: ''
      })
    }, 3000)
  }
}
