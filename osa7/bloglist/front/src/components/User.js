import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import usersService from '../services/users'

const User = () => {
  const [user, setUser] = useState(null)
  const id = useParams().id
  
  useEffect(() => {
    usersService.getAll().then(users => {
      setUser(
        users.find(user => user.id === id)
      )
    })
  }, [id])

  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>

      <h3>360noscoped bl0gs {/* eli lisätyt blogit*/}</h3>
      <ul>
        {user.blogs.map(blog => 
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User
