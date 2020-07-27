import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>{props.content.parts[props.number]} {props.content.exercises[props.number]}</p>
)

const Content = (props) => (
  <div>
    <Part content={props} number={0} />
    <Part content={props} number={1} />
    <Part content={props} number={2} />
  </div>
)

const Total = (props) => {
  var total = 0
  for (let i = 0; i < props.exercises.length; i++) {
    total += props.exercises[i]
  }
  
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercises = [10, 7, 14]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))