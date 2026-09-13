import RemoveForm from "./RemovePerson"

const Person = ({ person, remove }) => {
  return (
    <li>
      {person.name} {person.number} {person.id}
      <RemoveForm id={person.id} remove={remove} />
    </li>
  )
}
export default Person
