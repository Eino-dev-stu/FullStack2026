import { useState, useEffect } from "react"

import personService from "./services/persons"
import AddPerson from "./components/AddPerson"
import Filter from "./components/Filter"
import ShowPersons from "./components/ShowPersons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterLine, setFilter] = useState("")

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data)
    })
  }, [])
  console.log("render", persons.length, "notes")

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const match = persons.filter((person) => person.name === personObject.name)
    console.log(match, "match")
    if (match.length >= 1) {
      alert("stop")
    } else {
      //setPersons(persons.concat(personObject))
      //setNewName("")
      //setNewNumber("")
      console.log("button clicked", event.target)

      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data))
        setNewName("")
        setNewNumber("")
      })
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
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const personsToShow =
    filterLine === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterLine.toLowerCase()),
        )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterLine={filterLine} handleFilterChange={handleFilterChange} />

      <h2>Add a new person</h2>
      <AddPerson
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <ShowPersons personsToShow={personsToShow} />
    </div>
  )
}

export default App
