import React from 'react'

const Languages = ({ languages }) => (
  <ul>
    {languages.map(language => (
      <li key={language.name}> {language.name} </li>
    ))}
  </ul>
)

export default Languages
