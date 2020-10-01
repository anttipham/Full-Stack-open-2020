import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const resultAuthors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const resultBooks = useQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      alert('NEW BOOK', book.title)
      // console.log(1, book)

      const { allBooks } = client.readQuery({ query: ALL_BOOKS })
      // console.log(2, allBooks)
      // console.log(3, allBooks.map(store => store.id))
      // console.log(4, allBooks.map(store => store.id).includes(book.id))
      if (!allBooks.map(store => store.id).includes(book.id)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: { allBooks: allBooks.concat(book) }
        })
      }
    }
  })

  useEffect(() => {
    setToken(localStorage.getItem('library-token'))
  }, [])
  
  const logout = () => {
    localStorage.clear()
    setToken(null)
    client.resetStore()
  }
  
  const switchPage = (pageName) => {
    return () => setPage(pageName)
  }
  
  return (
    <div>
      <div>
        <button onClick={switchPage('authors')}>authors</button>
        <button onClick={switchPage('books')}>books</button>
        
        {!token &&
          <button onClick={switchPage('login')}>login</button>
        }

        {token &&
          <>
            <button onClick={switchPage('add')}>add book</button>
            <button onClick={switchPage('recommended')}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
        }
      </div>

      {page === 'authors' && !resultAuthors.loading &&
        <Authors
          authors={resultAuthors.data.allAuthors}
          token={token}
        />
      }

      {page === 'books' && !resultBooks.loading &&
        <Books books={resultBooks.data.allBooks} />
      }

      {page === 'login' &&
        <Login setToken={setToken} />
      }

      {page === 'recommended' &&
        <Recommended books={resultBooks.data.allBooks} />
      }

      {page === 'add' &&
        <NewBook />
      }

    </div>
  )
}

export default App