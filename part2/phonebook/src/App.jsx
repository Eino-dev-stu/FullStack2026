import { useState } from "react"
//import Person from "./components/Person"
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "050 555" },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    console.log(persons, personObject.name, "look")
    const match = persons.filter((person) => person.name === personObject.name)
    console.log(match, "match")
    if (match.length >= 1) {
      alert("stop")
    } else {
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
      console.log("button clicked", event.target)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
