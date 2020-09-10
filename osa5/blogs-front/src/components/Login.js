import React from 'react'

const Login = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        <label>
          {/* Username: */}
          ur naem:
          <input
            type='text'
            value={props.username}
            onChange={props.handleUsernameChange}
          />
        </label>
      </div>

      <div>
        <label>
          {/* Password: */}
          ur passwrd:
          <input
            type='password'
            value={props.password}
            onChange={props.handlePasswordChange}
          />
        </label>
      </div>
      <button type='submit'>l0g1n</button>
    </form>
  )
}

export default Login
