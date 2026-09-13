import axios from "axios"
import { useState, useEffect } from "react"
import SearchForm from "./components/SearchForm"
import countryDataService from "./services/countries"
import Country from "./components/Country"
const App = () => {
  const [countryData, setCountryData] = useState([])
  const [testData, setTestData] = useState([])
  const [filterLine, setFilter] = useState("")

  useEffect(() => {
    console.log("effect")
    axios
    countryDataService.getAll().then((response) => {
      console.log("promise fulfilled")
      setCountryData([response.data[0].name.common])
      setTestData(response.data)
      console.log(response.data[0].name, "SETCOUNTRYDATA")
      console.log(response.data, "test")
    })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const countriesToShow =
    filterLine === ""
      ? []
      : testData.filter((country) =>
          country.name.common.toLowerCase().includes(filterLine.toLowerCase()),
        )
  return (
    <div>
      <SearchForm
        filterLine={filterLine}
        handleFilterChange={handleFilterChange}
      />
      <ul>{countryData.map((country) => country)}</ul>
      <Country countriesToShow={countriesToShow} data={testData} />
    </div>
  )
}

export default App
