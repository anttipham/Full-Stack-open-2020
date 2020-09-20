export default (state='', action) => {
  switch (action.type) {
    case 'ERROR_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

// action creatorit
let timeoutID
export const setErrorNotificationAction = (errorMessage) => {
  return (dispatch) => {
    dispatch({
      type: 'ERROR',
      message: errorMessage
    })
  
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'ERROR',
        message: ''
      })
    }, 3000)
  }
}
