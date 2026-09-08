import { useState } from "react"
const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}
const Randomize = (props) => {
  return Math.floor(Math.random() * props.length)
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.from({ length: 8 }, () => 0))
  const [winner, setWinner] = useState(0)
  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    let winnerIndex = votes.indexOf(Math.max(...votes))
    setWinner(anecdotes[winnerIndex])
  }

  return (
    <div>
      <h1>Anecdote for the day</h1>
      <br></br>
      {anecdotes[selected]}
      <br></br>
      has {votes[selected]} votes
      <br></br>
      <Button
        onClick={() => setSelected(Randomize(anecdotes))}
        text="random anecdote"
      />
      <Button onClick={vote} text="vote" />
      <br></br>
      <h1>Anecdote with most votes</h1>
      winner {winner}
      <br></br>
      has {Math.max(...votes)} votes
    </div>
  )
}

export default App
