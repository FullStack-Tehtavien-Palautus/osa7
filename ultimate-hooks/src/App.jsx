import { useState, useEffect } from 'react'
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

const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  if ( !resources.length ) {
    axios.get(baseUrl)
      .then( resp => {
        setResources(resp.data)
      }) 
      .catch( err => {
        setResources([])
      })
  }

  const create = (resource) => {
    axios.post(baseUrl, resource, {})
      .then( resp => {
        if (resp.status == 201) setResources([])
      })
  }

  return [ resources, create ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteCreate] = useResource('http://localhost:3005/notes')
  const [persons, personCreate] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteCreate({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personCreate({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App