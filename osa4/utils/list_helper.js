const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {
      title: undefined,
      author: undefined,
      likes: 0
    }
  }

  return blogs.reduce((blogWithMostLikes, blog) =>
    blog.likes > blogWithMostLikes.likes ? blog : blogWithMostLikes)
}

const mostBlogs = (blogs) => {
  const amountOfBlogs = {}

  // Selvitä olion amountOfBlogs alle blogien määrä
  // amountOfBlogs = { author1: 1, author2: 3, ... }
  blogs.forEach(blog => {
    if (!amountOfBlogs[blog.author]) {
      amountOfBlogs[blog.author] = 0
    }
    amountOfBlogs[blog.author]++
  })

  let authorWithMostBlogs = {
    author: undefined,
    blogs: 0
  }
  for (const writer in amountOfBlogs) {
    if (amountOfBlogs[writer] > authorWithMostBlogs.blogs) {
      authorWithMostBlogs = {
        author: writer,
        blogs: amountOfBlogs[writer]
      }
    }
  }
  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  const amountOfLikes = {}

  // Selvitetään olioon tykkäyksien määrä
  // amountOfLikes = { author1: 1, author2: 3, ... }
  blogs.forEach(blog => {
    if (!amountOfLikes[blog.author]) {
      amountOfLikes[blog.author] = 0
    }
    amountOfLikes[blog.author] += blog.likes
  })

  let authorWithMostLikes = {
    author: undefined,
    likes: 0
  }
  for (const writer in amountOfLikes) {
    if (amountOfLikes[writer] > authorWithMostLikes.likes) {
      authorWithMostLikes = {
        author: writer,
        likes: amountOfLikes[writer]
      }
    }
  }
  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
