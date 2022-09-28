import axios from 'axios'
const baseUrl = 'https://www.sodexo.fi/en/ruokalistat/output/daily_json/80'

const getMenu = async (date) => {
  const response = await axios.get(`${baseUrl}/${date}`)
  return response.data
}

export default { getMenu }
