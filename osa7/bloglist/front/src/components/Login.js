import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { setErrorNotificationAction } from '../reducers/errorNotificationReducer'
import { setNotificationAction } from '../reducers/notificationReducer'
import { setUserAction } from '../reducers/userReducer'
import blogsService from '../services/blogs'
import loginService from '../services/login'
import Notification from './Notification'

const Login = () => {
  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('password')

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.send({ username, password })
      blogsService.setToken(user.token)

      dispatch(setUserAction(user))
      username.reset()
      password.reset()

      // tallennetaan muistiin
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      dispatch(setNotificationAction('l0gged in za gaem'))
    } catch (error) {
      console.error(error)
      dispatch(setErrorNotificationAction('ur us3rn4me or p4ssw0rd is veri wr0ng'))
    }
  }

  return (
    <div>
        <h2>Plz log in, scrub</h2>
        <Notification />

        <form onSubmit={login}>
        <div>
          <label>
            {/* Username: */}
            ur naem:
            <input {...username} />
          </label>
        </div>
        <div>
          <label>
            {/* Password: */}
            ur passwrd:
            <input {...password} />
          </label>
        </div>
        <button type='submit'>l0g1n</button>
      </form>
    </div>
  )
}

export default Login
