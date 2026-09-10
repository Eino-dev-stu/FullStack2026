const Filter = ({ filterLine, handleFilterChange }) => {
  return (
    <div>
      filter shown names:{" "}
      <input value={filterLine} onChange={handleFilterChange} />
    </div>
  )
}
export default Filter
