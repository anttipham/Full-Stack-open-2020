import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const sum = good - bad
  const all = good + neutral + bad
  
  if (all === 0) {
    return <p>No feedback given</p>
  }
  
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={sum / all} />
        <StatisticLine text="positive" value={good / all * 100 + " %"} />
      </tbody>
    </table>
  )
}

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)
  
  return (
    <div>
      <h1>Give feedback</h1>
      <Button text={"Good"} handleClick={goodClick} />
      <Button text={"Neutral"} handleClick={neutralClick} />
      <Button text={"Bad"} handleClick={badClick} />
      
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)