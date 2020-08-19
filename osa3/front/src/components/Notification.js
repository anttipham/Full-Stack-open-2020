import React from 'react'

const Notification = ({ message, errorMessage }) => {
  if (errorMessage !== '') {
    return (
      <div className='error'>
        {errorMessage}
      </div>
    )
  }

  if (message === '') {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

export default Notification
