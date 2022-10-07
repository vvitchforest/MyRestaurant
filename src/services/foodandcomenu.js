import axios from 'axios'
// const baseUrl ='https://www.foodandco.fi/modules/json/json/Index?costNumber=3202&language=en'

const config = {
  method: 'GET',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
}

const getMenu = async (id, language) => {
  const response = await axios.get(`${process.env.REACT_APP_REVERSE_PROXY_URL}/Index?costNumber=${id}&language=${language}`, config)
  return response.data
}

export default { getMenu }
