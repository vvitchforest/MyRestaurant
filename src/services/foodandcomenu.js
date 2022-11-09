import axios from 'axios'

const config = {
  method: 'GET',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
}

/**
 * Fetches menu data from FoodAndCo API
 * @param {string} id restaurant id
 * @param {string} language language option
 * @returns response data
 */
const getMenu = async (id, language) => {
  const response = await axios.get(`${process.env.REACT_APP_REVERSE_PROXY_URL}/Index?costNumber=${id}&language=${language}`, config)
  return response.data
}

export default { getMenu }
