import axios from 'axios'
// const baseUrl = 'https://www.sodexo.fi/en/ruokalistat/output/daily_json/80'

const getMenuEn = async (date, id) => {
  const response = await axios.get(`https://www.sodexo.fi/en/ruokalistat/output/daily_json/${id}/${date}`)
  return response.data
}

const getMenuFi = async (date, id) => {
  const response = await axios.get(`https://www.sodexo.fi/ruokalistat/output/daily_json/${id}/${date}`)
  return response.data
}

export default { getMenuEn, getMenuFi }
