import axios from 'axios'
const baseUrl = '/api/users'

const wrapper = async (func, ...args) => {
  const request = await func(...args)
  return request.data
}

const getAll = async () => await wrapper(axios.get, baseUrl)
const create = async (blog) => await wrapper(axios.post, baseUrl, blog)
const update = async (id, blog) => await wrapper(axios.put, `${baseUrl}/${id}`, blog)
const destroy = async (id) => await wrapper(axios.delete, `${baseUrl}/${id}`)

export default { getAll, create, update, destroy }