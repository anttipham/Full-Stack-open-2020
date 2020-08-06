import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Countries from './Countries'

const App = () => {
  // Asetettu epätodeksi, jotta ohjelma tietää, että valtioita ei ole vielä ladattu
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')

  const changeFilter = event => {
    setFilter(event.target.value)
  }

  const setCountry = event => {
    setFilter(event.target.id)
  }

  // Valtioiden tiedot
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      console.log('Getting our top secret countries')
      setAllCountries(response.data)
    })
  }, [])

  // Rajataan filterillä
  let countries = []
  const filterLower = filter.toLowerCase()
  for (const country of allCountries) {
    const countryLower = country.name.toLowerCase()
    // Jos filter on sama kuin valtion nimi, näytä vain tämä valtio
    if (countryLower === filterLower) {
      countries = [country]
      break
    } else if (countryLower.includes(filterLower)) {
      countries.push(country)
    }
  }

  return (
    <>
      <Filter filter={filter} handleFilter={changeFilter} />
      <Countries allCountries={allCountries} countries={countries} handleClickShow={setCountry} />
    </>
  )
}

export default App
