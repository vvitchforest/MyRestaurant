import axios from 'axios'
// const baseUrl = 'https://www.sodexo.fi/en/ruokalistat/output/daily_json/80'

const getMenu = async (date, id, language) => {
  const response = await axios.get(`https://www.sodexo.fi/${language}/ruokalistat/output/daily_json/${id}/${date}`)
  return response.data
}

export default { getMenu }
