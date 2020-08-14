const PORT = process.env.PORT || 3001

// Tästä alkaa sovellus
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('json-post', (req, res) => {
  // Vain POST-pyyntöihin logataan sisältö, kuten tehtävänannossa kerrotaan
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  } else {
    return ' '
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json-post'))

let persons = [
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: '神栖玲奈',
    number: '4342198',
    id: 7
  },
  {
    name: 'ゼロのマリア',
    number: '8585',
    id: 8
  },
  {
    name: 'フィンランド人',
    number: '+358358358',
    id: 11
  },
  {
    name: 'a',
    number: '1',
    id: 13
  },
  {
    name: 'b',
    number: '2',
    id: 14
  },
  {
    name: 'c',
    number: '3',
    id: 15
  },
  {
    name: '小鳥遊六花',
    number: '00011966911000',
    id: 17
  }
]

app.get('/info', (req, res) => {
  console.log('Getting info')
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>` +
    `<p>${new Date()}</p>`
  )
})

app.get('/api/persons', (req, res) => {
  console.log('Getting persons')
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    console.log('Getting', person.name)
    res.json(person)
  } else {
    res.sendStatus(404)
  }
})

app.post('/api/persons', (req, res) => {
  const person = {
    ...req.body,
    id: Math.floor(2 ** 30 * Math.random())
  }

  if (persons.some(somePerson => somePerson.name === person.name)) {
    res.status(400).json({ error: 'name must be unique' })
  } else if (!person.name) {
    res.status(400).json({ error: 'no name given' })
  } else if (!person.number) {
    res.status(400).json({ error: 'no number given' })
  } else {
    console.log('Adding', person.name)
    persons.push(person)
    res.json(person)
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    console.log('Deleting', person.name)
    persons = persons.filter(person => person.id !== id)
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
