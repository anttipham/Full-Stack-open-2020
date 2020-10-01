import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { EDIT_AUTHOR } from '../queries'

const Authors = ({ authors, token }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR)
  const changeBirthyear = (event) => {
    event.preventDefault()
    
    console.log('changing birthyear')
    editAuthor({
      variables: { name, setBornTo: Number(born) }
    })
    setName('')
    setBorn('')
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {token &&
        <>
          <h2>Set birthyear</h2>
          <form onSubmit={changeBirthyear}>
            <div>
              name
              <select value={name} onChange={({ target }) => setName(target.value)}>
                {authors.map(author => (
                  <option value={author.name} key={author.name}>{author.name}</option>
                ))}
              </select>
            </div>
            <div>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>

            <button>change</button>
          </form>
        </>
      }
    </div>
  )
}

export default Authors
