import React, { useState, useEffect } from 'react'
import personsService from '../services/persons'
import Input from './Input'
import Persons from './Persons'
import Filter from './Filter'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Haetaan henkilöt muistista
  useEffect(() => {
    personsService.getAll().then(data => {
      console.log('Getting our top secret phone numbers')
      setPersons(data)
    })
  }, [])

  const showMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const showErrorMessage = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => setErrorMessage(''), 3000)
  }

  //
  // Event handlers
  //

  const changeNumber = (person, number) => {
    console.log('changing', person)

    const newPerson = { ...person, number }
    personsService.update(newPerson.id, newPerson)
      .then(data => {
        setPersons(persons.map(checkPerson => checkPerson.id === data.id ? newPerson : checkPerson))

        console.log('changed', data)
        showMessage(`Changed ${data.name}'s phone number`)
      })
      .catch(error => {
        setPersons(persons.filter((checkPerson) => checkPerson.id !== newPerson.id))

        console.log(error)
        showErrorMessage(`${newPerson.name} was not in server database`)
      })

    setNewName('')
    setNewNumber('')
  }

  // Napin funktio
  const addNumber = (event) => {
    event.preventDefault()
    // Tarkista, onko jo lisätty.
    const person = persons.find(person => person.name === newName)
    if (person) {
      if (window.confirm(`${newName} has already been added to phonebook.\nDo you want to update the old number with the new one?`)) {
        // Jos on lisätty, muokkaa numeroa
        changeNumber(person, newNumber)
      }
      return
    }

    // Muuten lisää uusi henkilö
    console.log('adding number')
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personsService.create(newPerson).then((data) => {
      setNewName('')
      setNewNumber('')
      setPersons(persons.concat(data))

      console.log('added', data)
      showMessage(`Added ${data.name}`)
    })
  }

  const deleteNumber = (event) => {
    event.preventDefault()
    const name = event.target.id
    if (!window.confirm(`Delete ${name}?`)) {
      return
    }

    // Get id
    const deletePerson = persons.find(person => name === person.name)

    console.log('deleting', deletePerson.name)
    personsService.destroy(deletePerson.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== deletePerson.id))

        console.log('delete succesful', deletePerson)
        showMessage(`Deleted ${deletePerson.name}`)
      })
      .catch(error => {
        setPersons(persons.filter(person => person.id !== deletePerson.id))

        console.log(error)
        showErrorMessage(`${deletePerson.name} was already deleted`)
      })
  }

  const changeInputName = event => setNewName(event.target.value)
  const changeInputNumber = event => setNewNumber(event.target.value)
  const changeInputFilter = event => setFilter(event.target.value)

  return (
    <>
      <h1>Phonebook</h1>
      <Notification message={message} errorMessage={errorMessage} />

      <Filter filter={filter} handleFilterChange={changeInputFilter} />

      <h2>Add a new item</h2>
      <Input
        name={newName}
        handleNameChange={changeInputName}
        number={newNumber}
        handleNumberChange={changeInputNumber}
        handleSubmit={addNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={deleteNumber} />
    </>
  )
}

export default App
