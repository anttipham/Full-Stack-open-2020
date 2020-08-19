const mongoose = require('mongoose')

// Skeemat
const personSchema = mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

// Yhdistetään Mongoon
const [,, password, name, number] = process.argv
const url = `mongodb+srv://fullstack:${password}@cluster0.t2dox.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// Ohjelma alkaa
if (process.argv.length === 3) {
  // Listataan
  Person.find({}).then(response => {
    response.forEach(person => {
      console.log(person)
    })
    // console.log(response)

    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  // Lisätään
  const person = new Person({ name, number })
  person.save().then(response => {
    console.log(`${name} was added to database`)

    mongoose.connection.close()
  })
}
