import anecdoteService from '../services/anecdotes'

// Reducer
export default (stateParam = [], action) => {
  const state = [...stateParam]

  switch (action.type) {
    case 'ADD':
      state.push(action.data.anecdote)
      return state
    case 'VOTE':
      state.find(anecdote => anecdote.id === action.data.id).votes++
      return state
    case 'INIT':
      return action.data
    default:
      return state
  }
}

// Action creators
export const createVote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.put(anecdote.id, {
      content: anecdote.content,
      votes: anecdote.votes + 1
    })
    dispatch({
      type: 'VOTE',
      data: { id: newAnecdote.id }
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.post({
      content: anecdote,
      votes: 0
    })
    dispatch({
      type: 'ADD',
      data: { anecdote: newAnecdote }
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.get()
    // console.log(anecdotes)
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}
