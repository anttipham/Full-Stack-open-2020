// Importit
require('dotenv').config()
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

// Muuttujat
const PORT = process.env.PORT
// let persons = []

// Middlewaret
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// Logaaja
morgan.token('json-post', (req, res) => {
  // Vain POST-pyyntöihin logataan sisältö, kuten tehtävänannossa kerrotaan
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  } else {
    return ' '
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json-post'))

// Routet
app.get('/info', (req, res, next) => {
  console.log('Getting info')
  Person.countDocuments({})
    .then(count => {
      res.send(
      `<p>Phonebook has info for ${count} people</p>` +
      `<p>${new Date()}</p>`
      )
    })
    .catch(err => next(err))
})

app.get('/api/persons', (req, res, next) => {
  console.log('Getting persons')
  Person.find({})
    .then(persons => {
      res.json(persons)
    })
    .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => {
      // console.log('DEBUG', person)
      if (person) {
        console.log('Getting', person.name)
        res.json(person)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const person = new Person({ ...req.body })

  // Person.exists({ name: person.name })
  //   .then(nameExists => {
  //     console.log('DEBUG', nameExists)
  //     if (nameExists) {
  //       res.status(400).json({ error: 'name must be unique' })
  //     } else if (!person.name) {
  //       res.status(400).json({ error: 'no name given' })
  //     } else if (!person.number) {
  //       res.status(400).json({ error: 'no number given' })
  //     } else {
  //     }
  // })
  console.log('Adding', person.name)
  // persons.push(person)
  person.save()
    .then(newPerson => {
      res.json(newPerson)
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const person = { number: req.body.number }

  // Validaattori puttiin myös
  Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' })
    .then(person => {
      res.json(person)
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(person => {
      // console.log(person)
      if (person) {
        console.log('Deleting', person.name)
        // persons = persons.filter(person => person.id !== id)
      } else {
        console.log("Person wasn't found when attempting to delete")
      }
      res.sendStatus(204)
    })
    .catch(err => next(err))
})

// Virheidenkäsittely
const errorHandler = (err, req, res, next) => {
  console.error(err.name, '\t', err.message)

  if (err.name === 'CastError') {
    // console.error('ID was not written correctly')
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    // console.error(err.message)
    return res.status(400).send({ error: err.message })
  }

  next(err)
}
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
