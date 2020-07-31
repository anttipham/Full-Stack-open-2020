import React, { useState } from 'react'
import Input from './Input'
import Persons from './Persons'
import Filter from './Filter'

const App = () => {
    const [ persons, setPersons ] = useState([
            { name: 'Arto Hellas', number: '040-123456' },
            { name: 'Ada Lovelace', number: '39-44-5323523' },
            { name: 'Dan Abramov', number: '12-43-234345' },
            { name: 'Mary Poppendieck', number: '39-23-6423122' }
        ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    
    const addPhonebook = (event) => {
        event.preventDefault()
        
        // Tarkista, onko jo lisätty
        if (persons.some(person => person.name === newName)) {
            console.log('ALERT!!!')
            window.alert(`${newName} has already been added to phonebook`)
            return
        }
        
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