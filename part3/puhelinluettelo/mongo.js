if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}
const password = process.argv[2]
const nameArg = process.argv[3]
const numberArg = process.argv[4]
const url = `mongodb+srv://juhani:${password}@cluster0.y1w5isx.mongodb.net/phonebook?appName=Cluster0`
const mongoose = require("mongoose")
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)
mongoose.set("strictQuery", false)
mongoose.connect(url, { family: 4 })

if (process.argv.length === 3) {
  console.log("list of names")
  Person.find({}).then((result) => {
    result.forEach((p) => {
      console.log(p)
    })
    mongoose.connection.close()
  })
}

//const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
//const url = `mongodb+srv://juhanpg_db_user:${password}@cluster0.y1w5isx.mongodb.net/?appName=Cluster0`
//mongodb+srv://juhanpg_db_user:Wlgdsiu0rnexL1AK@cluster0.y1w5isx.mongodb.net/?appName=Cluster0
if (process.argv.lengt > 3) {
  const person = new Person({
    name: nameArg,
    number: numberArg,
  })

  person.save().then((result) => {
    console.log(`${person.name} person saved!`)
    mongoose.connection.close()
  })
}
