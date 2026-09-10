import Person from "./Person"

const ShowPersons = ({ personsToShow }) => {
  console.log("Current data:", personsToShow)
  return (
    <ul>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </ul>
  )
}
export default ShowPersons
