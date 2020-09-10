import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('submitting works', () => {
    const submitHandler = jest.fn()
    const { container } = render(
      <BlogForm createBlog={submitHandler} />
    )

    // aseta kentille arvot
    fireEvent.change(container.querySelector('#title'), {
      target: { value: 'gr8 naem m8' }
    })
    fireEvent.change(container.querySelector('#url'), {
      target: { value: 'www.n0sc0pe.pro' }
    })
    fireEvent.change(container.querySelector('#author'), {
      target: { value: 'pr0 gamer' }
    })
    // lähetä
    fireEvent.click(container.querySelector('button'))
    expect(submitHandler.mock.calls).toHaveLength(1)

    // tarkistus
    expect(submitHandler.mock.calls[0][0])
      .toHaveProperty('title', 'gr8 naem m8')
    expect(submitHandler.mock.calls[0][0])
      .toHaveProperty('url', 'www.n0sc0pe.pro')
    expect(submitHandler.mock.calls[0][0])
      .toHaveProperty('author', 'pr0 gamer')
  })
})