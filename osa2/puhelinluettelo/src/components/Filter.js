import React from 'react'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      {'Show names including '}
      <input
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default Filter
