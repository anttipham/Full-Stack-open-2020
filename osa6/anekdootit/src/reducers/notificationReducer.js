// Reducer
export default (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.data.message
    default:
      return state
  }
}

// Action creators
let timeoutID
export const setNotification = (message = '', timeInSeconds = 5) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFICATION',
      data: { message }
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        data: { message: '' }
      })
    }, timeInSeconds * 1000)
  }
}

