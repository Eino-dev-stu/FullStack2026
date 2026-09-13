import CountryInfo from "./CountryInfo"
import { useState } from "react"

const Country = ({ countriesToShow }) => {
  const [singleCountry, setSingleCountry] = useState(null) // String:name of country single searched
  // Find the searched counrty name from list of all
  const searchedCountry = countriesToShow.find(
    (country) => country.name.common === singleCountry,
  )
  //makes sure the searched country variables are set to null allows search field to work better
  if (singleCountry && !searchedCountry) {
    setSingleCountry(null)
  }
  // shows country when button pressed. if searhcCountry TRUE
  if (searchedCountry) {
    console.log(singleCountry, "single")
    return <CountryInfo oneData={[searchedCountry]} />
  }
  let CountryListLen = countriesToShow.length
  if (CountryListLen == 1) {
    console.log(countriesToShow, "1")
    return <CountryInfo oneData={countriesToShow} />
  } else if (CountryListLen > 10) {
    return <div>too many results</div>
  } else {
    return (
      <ul>
        {countriesToShow.map((country, index) => (
          <li key={index}>
            {country.name.common}
            <button onClick={() => setSingleCountry(country.name.common)}>
              info
            </button>
          </li>
        ))}
      </ul>
    )
  }
}

export default Country
