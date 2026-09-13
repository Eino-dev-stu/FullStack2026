const CountryInfo = ({ oneData }) => {
  console.log(oneData, "onedata")
  return (
    <div>
      <h1>{oneData[0].name.common}</h1>
      capital {oneData[0].capital[0]}
      <br></br>
      area {oneData[0].area}
      <h2>Languages</h2>
      <ul>
        {Object.values(oneData[0].languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <br></br>
      <img src={oneData[0].flags.png} alt={oneData[0].flags.alt}></img>
    </div>
  )
}
export default CountryInfo
