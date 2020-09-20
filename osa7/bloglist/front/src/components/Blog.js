import React from 'react'
import { useHistory } from 'react-router-dom'
// import Togglable from './Togglable'
import blogsService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlogAction, likeBlogAction } from '../reducers/blogReducer'
import { setErrorNotificationAction } from '../reducers/errorNotificationReducer'
import { setNotificationAction } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  
  const user = useSelector(state => state.user)
  
  const addLike = async (blog) => {
    // console.log('add')
    try {
      await blogsService.update(blog.id, {
        title: blog.title,
        url: blog.url,
        author: blog.author,
        user: blog.user.id,
        likes: blog.likes + 1
      })
      dispatch(likeBlogAction(blog.id))
    } catch (error) {
      // luultavasti
      dispatch(setErrorNotificationAction('user or the blog doesn\'t exist'))
    }
  }
  
  const deleteBlog = async (id) => {
    if (!window.confirm('r u sure?')) {
      return
    }
    try {
      await blogsService.destroy(id)
      dispatch(setNotificationAction(`${user.name} h34dsh0tt3d a bl0g`))
      dispatch(deleteBlogAction(id))
      history.push('/')
    } catch (error) {
      // luultavasti
      dispatch(setErrorNotificationAction('user doesn\'t exist'))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author && `– ${blog.author}`}</h2>

      <a href={blog.url}>{blog.url}</a>

      <div>
        {`l1kes: ${blog.likes}`}
        <button onClick={() => addLike(blog)}>
          i like diz
        </button>
      </div>

      <div>
        360noscoped by <strong>{`${blog.user.name}`}</strong>
      </div>

      {user.username === blog.user.username &&
        <button onClick={() => deleteBlog(blog.id)}>d3l3t3</button>
      }
    </div>
  )
}

export default Blog
