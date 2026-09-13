const SearchForm = ({ filterLine, handleFilterChange }) => {
  return (
    <form>
      search countries:{" "}
      <input value={filterLine} onChange={handleFilterChange} />
    </form>
  )
}
export default SearchForm
