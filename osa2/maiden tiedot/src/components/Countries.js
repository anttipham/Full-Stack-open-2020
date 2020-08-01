import React from 'react'
import CountryRow from './CountryRow'
import CountryInfo from './CountryInfo'

const Countries = ({ allCountries, countries, handleClickShow }) => {
  if (allCountries.length === 0) {
    console.log('loading countries')
    return (
      <div> Please wait for the countries to load. </div>
    )
  } else if (countries.length > 10) {
    return (
      <div> Too many matches! Please write a more accurate filter. </div>
    )
  } else if (countries.length > 1) {
    return (
      <CountryRow countries={countries} handleClick={handleClickShow} />
    )
  } else if (countries.length === 1) {
    return (
      <CountryInfo country={countries[0]} />
    )
  } else {
    return (
      <div> There were no matches with that keyword. </div>
    )
  }
}

export default Countries