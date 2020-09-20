import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import blogsService from './services/blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogsAction } from './reducers/blogReducer'
import { setUserAction } from './reducers/userReducer'
import BlogList from './components/BlogList'
import NavigationBar from './components/NavigationBar'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  // redux
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  // Sivun latautuessa haetaan tietokannasta blogit
  useEffect(() => {
    blogsService.getAll().then(blogs =>
      dispatch(initBlogsAction(blogs))
    )
  }, [dispatch])

  // Sivun latautuessa haetaan muistista kirjautumistiedot
  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(setUserAction(user))
      blogsService.setToken(user.token)
    }
  }, [dispatch])

  // haetaan oikeat parametrit
  const match = useRouteMatch('/blogs/:id')
  const blogMatch = match ?
    blogs.find(blog => blog.id === match.params.id) :
    null

  // Sisältö
  if (!user) {
    return (
      <Login />
    )
  }

  return (
    <div>
      <NavigationBar />

      <Notification />
      <h2>bl0gs</h2>
      
      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>

        <Route path='/blogs/:id'>
          <Blog blog={blogMatch} />
        </Route>
        
        <Route path='/'>
          <BlogList />
        </Route>
      </Switch>
      
    </div>
  )
}

export default App