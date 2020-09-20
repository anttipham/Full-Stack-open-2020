import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('blog list tests', () => {
  const mockHandler = jest.fn()
  let component

  beforeEach(() => {
    const blog = {
      title: 'haroo wa-rudo',
      author: 'purogurama-',
      url: 'www.ははは.jp',
      likes: 810,
      user: {
        username: 'zyapani-zumann',
        name: 'yamada'
      }
    }

    component = render(
      <Blog blog={blog} addLike={mockHandler} />
    )
  })

  test('should render text', () => {
    expect(component.container).toHaveTextContent(
      'haroo wa-rudo – purogurama-'
    )
  })

  test('should render url when fully shown', () => {
    const button = component.getByText('moar info')
    expect(button).toBeDefined()
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('www.ははは.jp')
  })

  test('should render likes when fully shown', () => {
    const button = component.getByText('moar info')
    expect(button).toBeDefined()
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('810')
  })

  test('update the amount of likes when user presses like button', () => {
    // koko blogi näkyville
    const button = component.getByText('moar info')
    expect(button).toBeDefined()
    fireEvent.click(button)

    // klikataan kahdesti like-nappia
    const likeButton = component.getByText('i like diz')
    expect(likeButton).toBeDefined()
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
