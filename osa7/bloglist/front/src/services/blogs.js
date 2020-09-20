import axios from 'axios'
const baseUrl = '/api/blogs'

let config = null
const setToken = (newToken) => {
  config = {
    headers: { Authorization: `bearer ${newToken}` }
  }
}

const wrapper = async (func, ...args) => {
  const request = await func(...args)
  return request.data
}

const getAll = async () => await wrapper(axios.get, baseUrl)
const create = async (blog) => await wrapper(axios.post, baseUrl, blog, config)
const update = async (id, blog) => await wrapper(axios.put, `${baseUrl}/${id}`, blog, config)
const destroy = async (id) => await wrapper(axios.delete, `${baseUrl}/${id}`, config)

export default { setToken, getAll, create, update, destroy }