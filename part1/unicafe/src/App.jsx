import { useState } from "react"
const Stats = (props) => {
  let all = props.good + props.bad + props.neutral
  return (
    <div>
      <h1>statistics</h1>
      good {props.good} <br />
      neutral {props.neutral} <br />
      bad {props.bad} <br />
      all {props.good + props.bad + props.neutral} <br />
      average {(props.good - props.bad) / all} <br />
      positive {props.good / all}
    </div>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <div>
        <Stats good={good} bad={bad} neutral={neutral} />
      </div>
    </div>
  )
}

export default App
