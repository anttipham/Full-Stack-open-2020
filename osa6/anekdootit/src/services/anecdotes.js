import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const wrapper = async (command, ...params) => {
  const response = await command(...params)
  return response.data
}

const get = async () => await wrapper(axios.get, url)
const post = async (anecdote) => await wrapper(axios.post, url, anecdote)
const put = async (id, anecdote) => await wrapper(axios.put, `${url}/${id}`, anecdote)

export default { get, post, put }
