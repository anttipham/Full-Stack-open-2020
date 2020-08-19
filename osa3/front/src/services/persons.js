import axios from 'axios'
const baseUrl = '/api/persons'

const wrapper = (f, ...args) => {
  const request = f(...args)
  return request.then(response => response.data)
}

const getAll = () => wrapper(axios.get, baseUrl)

const create = (newObject) => wrapper(axios.post, baseUrl, newObject)

const destroy = (id) => wrapper(axios.delete, `${baseUrl}/${id}`)

const update = (id, newObject) => wrapper(axios.put, `${baseUrl}/${id}`, newObject)

export default { getAll, create, destroy, update }
