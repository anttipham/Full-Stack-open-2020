import React from 'react'
import { useDispatch } from 'react-redux'
import { createFilter } from '../reducers/filterReducer'

const Filter = () => {
  // console.log('filter renderöityy')
  
  const dispatch = useDispatch()
  
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    dispatch(createFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter