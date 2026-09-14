import "./index.css"
import { useState, useEffect } from "react"

import personService from "./services/persons"
import AddPerson from "./components/AddPerson"
import Filter from "./components/Filter"
import ShowPersons from "./components/ShowPersons"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterLine, setFilter] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data)
    })
  }, [])
  console.log("render", persons.length, "notes")
  const baseUrl = "http://localhost:3001/api/persons/"

  const remove = (id) => {
    if (window.confirm("Delete?")) {
      personService.remove(baseUrl.concat(id)).then(() => {
        personService.getAll().then((response) => {
          setPersons(response.data)
        })
        setSuccessMessage(`Done removing `)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
    } else {
      //alert("stop")
      setErrorMessage("cancel")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const match = persons.filter((person) => person.name === personObject.name)
    console.log(match, "match")
    if (match.length >= 1) {
      console.log(match, "MATCH2")
      if (window.confirm("replace?")) {
        console.log("button clicked", event.target)
        console.log("put data", personObject)

        personService
          .edit(match[0].id, personObject)
          .then((response) => {
            console.log("resdata", response.data)
            setPersons(persons.concat(response.data))
            setNewName("")
            setNewNumber("")
            setSuccessMessage("Done edititng")
          })
          .catch(() => {
            console.log("fail")
            setErrorMessage(`${personObject.name} person does not exist`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
      } else {
        alert("stopped")
      }
    } else {
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data))
        setNewName("")
        setNewNumber("")
        setSuccessMessage(`Done adding ${personObject.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
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
      <Notification message={errorMessage} className={"error"} />
      <Notification message={successMessage} className={"success"} />
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
      <ShowPersons personsToShow={personsToShow} remove={remove} />
    </div>
  )
}

export default App
