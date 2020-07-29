import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const DisplayAnecdote = ({header, anecdote, votes}) => (
  <div>
    <h1>{header}</h1>
    <p>{anecdote}</p>
    <p>This anecdote has {votes} votes</p>
  </div>
)

const App = ({anecdotes}) => {
  const [select, setSelect] = useState(0)
  const [selectMostVotes, setSelectMostVotes] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))
  
  const addVote = () => {
    const newVotes = [...votes]
    newVotes[select]++
    
    if (newVotes[select] > Math.max(...votes)) {
      setSelectMostVotes(select)
    }
    setVotes(newVotes)
  }
  
  const nextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * 6)
    setSelect(randomIndex)
  }
  
  return (
    <div>
      <DisplayAnecdote 
        header={"Anecdote of the day"}
        anecdote={anecdotes[select]}
        votes={votes[select]}
      />
      
      <Button text={"Vote"} handleClick={addVote} />
      <Button text={"Next Anecdote"} handleClick={nextAnecdote} />
      
      <DisplayAnecdote 
        header={"Anecdote with the most votes"}
        anecdote={anecdotes[selectMostVotes]}
        votes={votes[selectMostVotes]}
      />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)