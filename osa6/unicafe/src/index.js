import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const addGood = () => store.dispatch({ type: 'GOOD' })
  const addOk = () => store.dispatch({ type: 'OK' })
  const addBad = () => store.dispatch({ type: 'BAD' })
  const reset = () => store.dispatch({ type: 'ZERO' })
  
  // Helper function
  const getState = (stateName) => store.getState()[stateName]
  // Variables
  const good = getState('good')
  const neutral = getState('ok')
  const bad = getState('bad')
  const all = good + neutral + bad
  const points = good - bad

  return (
    <div>
      <button onClick={addGood}>good</button> 
      <button onClick={addOk}>neutral</button> 
      <button onClick={addBad}>bad</button>
      <button onClick={reset}>reset stats</button>
      
      {all &&
      <div>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {all}</div>
        <div>average {points / all}</div>
        <div>positive {good / all * 100} %</div>
      </div>}
      {!all && <div>No feedback given</div>}
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
