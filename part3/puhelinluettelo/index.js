require("dotenv").config()

const express = require("express")
const Person = require("./models/person")
const morgan = require("morgan")
//const cors = require("cors") removed

const app = express()
app.use(express.static("dist"))
//app.use(cors()) removed
app.use(morgan("tiny"))
app.use(express.json())
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

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
  Person.find().then((person) => {
    response.json(person)
  })
})

app.get("/api/persons/:id", (request, response, next) => {
  //   const id = parseInt(request.params.id)
  //   console.log(id, "id at get one")
  //   const person = persons.find((person) => person.id === id)

  //   if (person) {
  //     response.json(person)
  //   } else {
  //     response.status(404).end()
  //   }
  console.log(request.params.id, "idparam")
  //   Person.findById(parseInt(request.params.id)).then((person) => {
  //     response.json(person)
  //   })
  const myId = parseInt(request.params.id)
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        console.log(person, "person in error")
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
  //   Person.findOne({ myId: myId }).then((person) => {
  //     response.json(person)
  //   })
  //   Person.findOne({ myId: myId })
  //     .then((person) => {
  //       if (person) {
  //         console.log(person, "person in error")
  //         response.json(person)
  //       } else {
  //         response.status(404).end()
  //       }
  //     })
  //     .catch((error) => next(error))
})
app.delete("/api/persons/:id", (request, response, next) => {
  const myId = parseInt(request.params.id)
  //   console.log(id, "id at delete")
  //   persons = persons.filter((p) => p.id !== id)
  Person.deleteOne({ _id: request.params.id })
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
  //response.status(204).end()
})

const generateId = () => {
  const maxId = Math.floor(Math.random() * 999999)
  return maxId
}
app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedNumber) => {
        response.json(updatedNumber)
      })
    })
    .catch((error) => next(error))
})
app.post("/api/persons", (request, response, next) => {
  const body = request.body
  console.log(body, "body")

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "data missing",
    })
    //   } else if (persons.find((p) => p.name === body.name)) {
    //     return response.status(400).json({
    //       error: "name must be unique'",
    //     })
  } else
    Person.findOne({ name: body.name }).then((person) => {
      if (person) {
        console.log("in already")
        return response.status(404).json({ error: `name must be unique` })
      } else {
        console.log("in already not working")
        const person = new Person({
          name: body.name,
          number: body.number,
          //myId: generateId(),
        })
        person
          .save()
          .then((savedPerson) => {
            persons = persons.concat(person)
            console.log(person, "person")
            response.json(savedPerson).end()
          })
          .catch((error) => next(error))

        // persons = persons.concat(person)
        // console.log(person, "person")
      }
    })

  //   const person = {
  //     name: body.name,
  //     number: body.number,
  //     id: generateId(),
  //   }

  //response.json(person)
})
app.get("/info", (request, response) => {
  Person.find().then((person) => {
    console.log(person, "person")
    response.json(
      `phonebook has info for  ${person.length} ${new Date().toString()}`,
    )
  })
  //   response.json(
  //     `phonebook has info for  ${persons.length} ${new Date().toString()}`,
  //   )
})
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
