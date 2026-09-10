import Person from "./Person"

const ShowPersons = ({ personsToShow }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </ul>
  )
}
export default ShowPersons
//<li key={person.id}>
//       {person.id} {person.name} {person.number}
//    </li>
