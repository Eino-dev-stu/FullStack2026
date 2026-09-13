import Person from "./Person"

const ShowPersons = ({ personsToShow, remove }) => {
  console.log("Current data:", personsToShow)
  return (
    <ul>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} remove={remove} />
      ))}
    </ul>
  )
}
export default ShowPersons
