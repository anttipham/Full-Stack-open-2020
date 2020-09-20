import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    createBlog({ title, url, author })
  }

  useEffect(() => {
    setTitle('')
    setUrl('')
    setAuthor('')
  }, [createBlog])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>t1t1e:</label>
        <input id='title' value={title} onChange={({ target }) => setTitle(target.value)} />
        <br />

        <label htmlFor='url'>ur1:</label>
        <input id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        <br />

        <label htmlFor='author'>auth0r:</label>
        <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        <br />

        <button type='submit'>subm1t</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
