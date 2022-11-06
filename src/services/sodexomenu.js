import axios from 'axios'

/**
 * Fetch menu data from Sodexo API
 * @param {string} date date
 * @param {string} id restaurant id
 * @returns response data
 */
const getMenuEn = async (date, id) => {
  const response = await axios.get(`https://www.sodexo.fi/en/ruokalistat/output/daily_json/${id}/${date}`)
  return response.data
}

const getMenuFi = async (date, id) => {
  const response = await axios.get(`https://www.sodexo.fi/ruokalistat/output/daily_json/${id}/${date}`)
  console.log('response', response)
  return response.data
}

export default { getMenuEn, getMenuFi }
