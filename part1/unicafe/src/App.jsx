import { useState } from "react"
const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}
const Stats = (props) => {
  //let all = props.good + props.bad + props.neutral

  console.log("count", props)
  if (props.count == 0) {
    return (
      <div>
        <p>no feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <StatisticsLine text="good" value={props.good} />
        <StatisticsLine text="bad" value={props.bad} />
        <StatisticsLine text="neutral" value={props.neutral} />
        <StatisticsLine
          text="all"
          value={props.good + props.bad + props.neutral}
        />
        <StatisticsLine
          text="average"
          value={(props.good - props.bad) / props.count}
        />
        <StatisticsLine text="positive" value={props.good / props.count} />
      </div>
    )
  }
}
const StatisticsLine = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [count, setCount] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button
          onClick={() => {
            setCount(count + 1)
            setGood(good + 1)
          }}
          text="good"
        />
        <Button
          onClick={() => {
            setCount(count + 1)
            setBad(bad + 1)
          }}
          text="bad"
        />
        <Button
          onClick={() => {
            setCount(count + 1)
            setNeutral(neutral + 1)
          }}
          text="neutral"
        />
      </div>
      <div>
        <Stats good={good} bad={bad} neutral={neutral} count={count} />
      </div>
    </div>
  )
}

export default App
