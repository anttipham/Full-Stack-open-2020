const Blog = require('../models/blog')

const initialBlogs = [
  { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 },
  { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5 },
  { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12 },
  { title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10 },
  { title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0 },
  { title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2 }
]

const newBlog = {
  title: 'Kissa jäi auton alle',
  author: 'Kiva Blogaaja',
  url: 'www.kivatblogit.fi',
  likes: 3
}

const anotherNewBlog = {
  title: 'これは新しいブログ',
  author: 'ブロガー',
  url: 'www.naisubo-to.jp',
  likes: 2525
}

const blogWithMissingLikes = {
  title: 'Me me me me',
  author: 'I',
  url: 'www.memememe.fi',
}

const blogWithMissingUrl = {
  title: 'Me me me me',
  author: 'I',
  likes: 0
}

const blogWithMissingTitle = {
  author: 'I',
  url: 'www.memememe.fi',
  likes: 0
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  newBlog,
  anotherNewBlog,
  blogWithMissingLikes,
  blogWithMissingTitle,
  blogWithMissingUrl,
  blogsInDb
}