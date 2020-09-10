import React from 'react'

const Notification = (props) => {
  if (props.error) {
    return (
      <div className='errorNotification'>
        {props.error}
      </div>
    )
  }

  if (props.message) {
    return (
      <div className='notification'>
        {props.message}
      </div>
    )
  }

  return null
}

export default Notification
