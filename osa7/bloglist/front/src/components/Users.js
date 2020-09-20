import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import usersService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    usersService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  return (
    <div>
      <h2>us3rs</h2>

      <table>
        <thead>
          <tr>
            <td></td>
            <th>bl0gs cr8t3d</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
