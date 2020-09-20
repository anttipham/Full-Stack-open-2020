import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const errorNotification = useSelector(state => state.errorNotification)
  if (errorNotification) {
    return (
      <div className='errorNotification'>
        {errorNotification}
      </div>
    )
  } else if (notification) {
    return (
      <div className='notification'>
        {notification}
      </div>
    )
  } else {
    return null
  }
}

export default Notification
