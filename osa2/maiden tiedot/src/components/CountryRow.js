import React from 'react'

const CountryRow = ({ countries, handleClick }) => (
  <div>
    {countries.map(country => (
      <div key={country.name}>
        {country.name}
        {/* Asetetaan napille id saadaksemme klikatun valtion nimi */}
        <button id={country.name} onClick={handleClick}>show</button>
      </div>
    ))}
  </div>
)

export default CountryRow
