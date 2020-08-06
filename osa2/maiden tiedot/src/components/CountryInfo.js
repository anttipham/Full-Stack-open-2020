import React from 'react'
import Languages from './Languages'

const CountryInfo = ({ country }) => (
  <div>
    <h2>{country.name}</h2>

    <div>Capital: {country.capital}</div>
    <div>Population: {country.population}</div>

    <h3>Languages</h3>
    <Languages languages={country.languages} />

    <img
      src={country.flag}
      alt={`Flag of ${country.name}`}
      style={{ width: '25%', height: '25%' }}
    />
  </div>
)

export default CountryInfo
