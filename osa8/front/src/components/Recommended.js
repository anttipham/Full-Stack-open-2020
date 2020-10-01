import { useQuery } from '@apollo/client'
import React from 'react'
import { ME } from '../queries'

const Recommended = ({ books }) => {
  const resultMe = useQuery(ME)
  
  if (resultMe.loading) {
    return null
  }
  
  const favoriteGenre = resultMe.data.me.favoriteGenre
  return (
    <div>
      <h2>recommended</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books
            .filter(a => a.genres.includes(favoriteGenre))
            .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
