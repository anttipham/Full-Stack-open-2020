import React from 'react'

const PersonItem = ({ name, number, onHandleDelete }) => (
  <div>
    {`${name}, ${number} `}
    <button id={name} onClick={onHandleDelete}>delete</button>
  </div>
)

export default PersonItem
