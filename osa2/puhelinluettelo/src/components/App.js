import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Input from './Input'
import Persons from './Persons'
import Filter from './Filter'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    
    // Event handlers
    const addPhonebook = (event) => {
        event.preventDefault()
        
        // Tarkista, onko jo lisätty
        if (persons.some(person => person.name === newName)) {
            console.log('ALERT!!!')
            window.alert(`${newName} has already been added to phonebook`)
            return
        }
        
        // Muuten lisää uusi henkilö
        const newPerson = {
            name: newName,
            number: newNumber
        }
        setNewName('')
        setNewNumber('')
        
        setPersons(persons.concat(newPerson))
    }
    const changeName = event => setNewName(event.target.value)
    const changeNumber = event => setNewNumber(event.target.value)
    const changeFilter = event => setFilter(event.target.value)
    
    // Haetaan henkilöt muistista
    useEffect(() => {
        axios.get('http://localhost:3001/persons').then(response => {
            console.log('Getting our top secret phone numbers')
            setPersons(response.data)
        })
    }, [])
    
    return (
        <>
            <h1>Phonebook</h1>
            <Filter filter={filter} handleFilterChange={changeFilter} />
            
            <h2>Add a new item</h2>
            <Input 
                name={newName}
                handleNameChange={changeName}
                number={newNumber}
                handleNumberChange={changeNumber}
                handleSubmit={addPhonebook}
            />
            
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} />
            
        </>
    )

}

export default App