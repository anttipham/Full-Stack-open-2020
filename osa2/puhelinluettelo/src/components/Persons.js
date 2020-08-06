import React from 'react'
import PersonItem from './PersonItem'

const Persons = (props) => {
  const persons = props.persons.filter(person => {
    const name = person.name.toLowerCase()
    const filter = props.filter.toLowerCase()
    return name.includes(filter)
  })

  return (
    <div>
      {persons.map(person => (
        <PersonItem
          key={person.name}
          name={person.name}
          number={person.number}
          onHandleDelete={props.handleDelete}
        />
      ))}
    </div>
  )
}

export default Persons
