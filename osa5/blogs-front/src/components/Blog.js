import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, addLike, username, deleteBlog }) => {
  // console.log(blog.title, typeof username, typeof blog.user.username)
  return (
    <div className='blog'>
      {blog.title} {blog.author && `– ${blog.author}`}

      <Togglable textShow='moar info' textHide='nvm, bruh'>
        <div>{`ur1: ${blog.url}`}</div>

        <div>
          {`l1kes: ${blog.likes}`}
          <button onClick={() => addLike(blog)}>
            i like diz
          </button>
        </div>

        <div>{`usernaem: ${blog.user.username}`}</div>

        <div>{`naem: ${blog.user.name}`}</div>

        {username === blog.user.username &&
          <button onClick={() => deleteBlog(blog.id)}>d3l3t3</button>
        }
      </Togglable>
    </div>
  )
}

export default Blog
