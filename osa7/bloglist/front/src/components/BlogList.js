import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addBlogAction } from '../reducers/blogReducer'
import { setErrorNotificationAction } from '../reducers/errorNotificationReducer'
import { setNotificationAction } from '../reducers/notificationReducer'
// import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogsService from '../services/blogs'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const blogs = useSelector(state => state.blogs)

  const addBlog = async ({ title, url, author }) => {
    try {
      // Tietokannan POSTissa kuuluu olla populate
      const blog = await blogsService.create({ title, url, author })

      dispatch(addBlogAction(blog))
      dispatch(setNotificationAction(`bl0g 360noscoped: ${blog.title}`))

      // onnistui
      blogFormRef.current.toggleShow()
      return
    } catch (error) {
      console.error(error.response)

      if (error.response.status === 401) {
        // Luultavasti käyttäjä on poistettu
        dispatch(setErrorNotificationAction('diz user iz inv4lid. cons1der rel0gging'))
      } else if (error.response.status === 400) {
        // Luultavasti ValidationError
        dispatch(setErrorNotificationAction('plz 1nsert at least t1tle and ur1'))
      }
      return
    }
  }

  return (
    <div>
      <h2>cre8 new bl0gs, lul</h2>
      <Togglable textShow='new bl0g' textHide='actually nvm' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <div style={{ 'paddingTop': 20 }}>
        {blogs
          .sort((prevBlog, currentBlog) => currentBlog.likes - prevBlog.likes)
          .map(blog =>
            <div key={blog.id} className='blog'>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author && `– ${blog.author}`}
              </Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default BlogList
