import React, { useState, useEffect } from 'react'
import blogsService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // login
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // ilmoitukset
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  // ref
  const blogFormRef = React.createRef()

  // Funktiot
  const addBlog = async ({ title, url, author }) => {
    try {
      // Tietokannan POSTissa kuuluu olla populate
      const blog = await blogsService.create({ title, url, author })
      // console.log(blog)

      // Jos ei ole populate, käytetään seuraavaa koodia
      // if (!blog.user.id) {
      //   const newBlog = { ...blog, user: {
      //     username: user.username,
      //     name: user.name
      //   } }
      //   setBlogs(blogs.concat(newBlog))

      //   // onnistui
      //   return true
      // }

      setBlogs(blogs.concat(blog))
      setNotification(`bl0g 360noscoped: ${blog.title}`)

      // onnistui
      return true
    } catch (error) {
      console.error(error.response)

      if (error.response.status === 401) {
        // Luultavasti käyttäjä on poistettu
        setErrorNotification('diz user iz inv4lid. cons1der rel0gging')
      } else if (error.response.status === 400) {
        // Luultavasti ValidationError
        setErrorNotification('plz 1nsert at least t1tle and ur1')
      }
      return false
    }
  }

  const addLike = async (blog) => {
    console.log('add')

    try {
      await blogsService.update(blog.id, {
        title: blog.title,
        url: blog.url,
        author: blog.author,
        user: blog.user.id,
        likes: blog.likes + 1
      })

      const blogsCopy = [...blogs]
      const blogBeingUpdated = blogsCopy.find((findBlog) => findBlog.id === blog.id)
      blogBeingUpdated.likes++
      setBlogs(blogsCopy)
    } catch (error) {
      // luultavasti
      setErrorNotification('user or the blog doesn\'t exist')
    }

  }

  const deleteBlog = async (id) => {
    if (!window.confirm('r u sure?')) {
      return
    }
    try {
      await blogsService.destroy(id)
      setNotification(`${user.name} h34dsh0tt3d a bl0g`)

      const newBlogs = blogs.filter((blog) => blog.id !== id)
      setBlogs(newBlogs)
    } catch (error) {
      // luultavasti
      setErrorNotification('user doesn\'t exist')
    }
  }

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.send({ username, password })
      blogsService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

      // tallennetaan muistiin
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setNotification('l0gged in za gaem')
    } catch (error) {
      console.error(error)
      setErrorNotification('ur us3rn4me or p4ssw0rd is veri wr0ng')
    }
  }

  const logout = (event) => {
    if (event) {
      event.preventDefault()
    }
    setUser(null)
    window.localStorage.removeItem('loggedUser')

    setNotification('lul, n00b')
  }

  const setNotification = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  const setErrorNotification = (error) => {
    setError(error)
    setTimeout(() => {
      setError('')
    }, 3000)
  }

  // Sivun latautuessa
  useEffect(() => {
    blogsService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  // console.log(blogs)

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  // Sisältö
  if (!user) {
    return (
      <div>
        <h2>Plz log in, scrub</h2>
        <Notification error={error} message={message}/>
        <Login
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={login}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>bl0gs</h2>
      <Notification error={error} message={message}/>

      <div>
        <b>{user.name}</b> is in da gaem
        <button onClick={logout}>logout is 4 n00bs</button>
        {/* <a onClick={handleLogout} href=''>logout is 4 n00bs</a> */}
      </div>
      <h2>cre8 new bl0gs, lul</h2>
      <Togglable textShow='new bl0g' textHide='actually nvm' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <div style={{ 'paddingTop': 20 }}>
        {blogs
          .sort((prevBlog, currentBlog) => currentBlog.likes - prevBlog.likes)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              username={user.username}
              addLike={addLike}
              deleteBlog={deleteBlog}
            />
          )
        }
      </div>
    </div>
  )
}

export default App