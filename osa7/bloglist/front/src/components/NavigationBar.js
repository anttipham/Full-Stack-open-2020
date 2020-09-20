import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationAction } from '../reducers/notificationReducer'
import { setUserAction } from '../reducers/userReducer'

const LoginStatus = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  
  const logout = (event) => {
    if (event) {
      event.preventDefault()
    }
    dispatch(setUserAction(null))
    window.localStorage.removeItem('loggedUser')

    dispatch(setNotificationAction('lul, n00b'))
  }

  const navigationStyle = {
    background: '#eeeeee',
    padding: '5px',
    border: 'solid 2px'
  }
  
  const linkStyle = {
    marginRight: '10px'
  }
  return (
    <div style={navigationStyle}>
      <Link to='/' style={linkStyle}>bl0gs</Link>
      <Link to='/users' style={linkStyle}>us3rs</Link>
      <b>{user.name}</b> is in da gaem
      <button onClick={logout}>logout is 4 n00bs</button>
    </div>
  )
}

export default LoginStatus
