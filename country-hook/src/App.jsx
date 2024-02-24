import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then( resp => {
        console.log(resp.data)
        setCountry(resp)
      })
      .catch( () => {
        setCountry(null)
      })
  }, [name])

  return country
}

const Country = ({ country }) => {

  if (!country || country.status >= 400 ) {
    return (
      <div>
        Not searched or not found...
      </div>
    )
  }

  const name = country.data.name.common
  const capital = country.data.capital[0]
  const population = country.data.population
  const flag = country.data.flag

  return (
    <div>
      <h3>{name}</h3>
      <div>capital {capital} </div>
      <div>population {population}</div> 
      <div style={{fontSize: '10em'}}>{flag}</div>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App