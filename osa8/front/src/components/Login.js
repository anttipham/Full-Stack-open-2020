import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries'

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginSuccessful, setLoginSuccessful] = useState(false)
  
  const [login, result] = useMutation(LOGIN)
  useEffect(() => {
    if (result.data) {
      setLoginSuccessful(true)
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-token', token)
    }
  }, [result.data]) // eslint-disable-line
  
  const submit = (event) => {
    event.preventDefault()
    login({
      variables: { username, password }
    })
  }
  
  if (loginSuccessful) {
    return <div>login successful</div>
  }
  
  return (
    <form onSubmit={submit}>
      <div>
        username:
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />
      </div>
      <button>confirm</button>
    </form>
  )
}

export default Login
