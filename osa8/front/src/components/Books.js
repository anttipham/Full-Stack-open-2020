import React, { useState } from 'react'

const Books = ({ books }) => {
  const [filter, setFilter] = useState('')
  
  // eri genret
  const genres = []
  books
    .map(book => book.genres)
    .forEach(genresInBook => {
      genres.push(
        ...genresInBook.filter(genreInBook => !genres.includes(genreInBook)) // O(n^2)
      )
    })
  
  // asetetaan filtteri
  if (filter) {
    books = books.filter(a => a.genres.includes(filter))
  }
  
  const switchFilter = (filterName) => {
    return () => setFilter(filterName)
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      {genres.map(genre => (
        <button key={genre} onClick={switchFilter(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={switchFilter('')}>all genres</button>
    </div>
  )
}

export default Books