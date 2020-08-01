import React from 'react'

const Filter = ({ filter, handleFilter }) => (
  <div>
    Find countries
    <input onChange={handleFilter} value={filter} />
  </div>
)

export default Filter