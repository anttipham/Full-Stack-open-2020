import axios from 'axios'
const baseUrl = '/api/login'

const send = async (user) => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

export default {
  send
}
