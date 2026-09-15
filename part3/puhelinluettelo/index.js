const express = require("express")
const morgan = require("morgan")
//const cors = require("cors") removed

const app = express()
app.use(express.static("dist"))
app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())

let persons = [
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 1,
  },
  {
    name: "wdwd",
    number: "2323",
    id: 2,
  },
  {
    name: "www",
    number: "111",
    id: 3,
  },
  {
    name: "awass",
    number: "22",
    id: 4,
  },
]

// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>")
// })

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = parseInt(request.params.id)
  console.log(id, "id at get one")
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
app.delete("/api/persons/:id", (request, response) => {
  const id = parseInt(request.params.id)
  console.log(id, "id at delete")
  persons = persons.filter((p) => p.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = Math.floor(Math.random() * 1000)
  return maxId
}
app.post("/api/persons", (request, response) => {
  const body = request.body
  console.log(body, "body")

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "data missing",
    })
  } else if (persons.find((p) => p.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique'",
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)
  console.log(person, "person")
  response.json(person)
})
app.get("/info", (request, response) => {
  response.json(
    `phonebook has info for  ${persons.length} ${new Date().toString()}`,
  )
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
