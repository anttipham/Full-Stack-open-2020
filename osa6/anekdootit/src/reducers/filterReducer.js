export default (state = '', action) => {
  switch (action.type) {
    case 'SET':
      return action.data.content
    default:
      return state
  }
}

export const createFilter = (filter) => {
  return {
    type: 'SET',
    data: { content: filter }
  }
}
