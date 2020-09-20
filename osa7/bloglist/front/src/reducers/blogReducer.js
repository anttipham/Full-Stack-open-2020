export default (state=[], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return state.concat(action.blog)
    case 'INIT_BLOGS':
      return action.blogs
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.id)
    case 'LIKE_BLOG':
      const blogs = [...state]
      const blog = blogs.find(blog => blog.id === action.id)
      blog.likes += 1
      return blogs
    default:
      return state
  }
}

export const addBlogAction = (blog) => {
  return {
    type: 'ADD_BLOG',
    blog
  }
}

export const initBlogsAction = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    blogs
  }
}

export const deleteBlogAction = (id) => {
  return {
    type: 'DELETE_BLOG',
    id
  }
}

export const likeBlogAction = (id) => {
  return {
    type: 'LIKE_BLOG',
    id
  }
}
