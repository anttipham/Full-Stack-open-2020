import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const wrapper = (f, ...args) => {
  const request = f(...args)
  return request.then(response => response.data)
}

const getAll = () => {
  return wrapper(axios.get, baseUrl)
}

const create = (newObject) => {
  return wrapper(axios.post, baseUrl, newObject)
}

const destroy = (id) => {
  return wrapper(axios.delete, `${baseUrl}/${id}`)
}

const update = (id, newObject) => {
  return wrapper(axios.put, `${baseUrl}/${id}`, newObject)
}

export default { getAll, create, destroy, update }
