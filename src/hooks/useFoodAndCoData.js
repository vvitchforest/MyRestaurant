import { useEffect, useState } from 'react'
import foodandcoMenuService from '../services/foodandcomenu'
import { useCookies } from 'react-cookie'

export const useFoodAndCoData = (restaurantId) => {
  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [cookies] = useCookies(['language'])

  const myLanguage = cookies.language ? cookies.language : 'en'

  useEffect(() => {
    const getFoodAndCoMenu = async () => {
      setLoading(true)
      try {
        const menuFromAPI = await foodandcoMenuService.getMenu(restaurantId, myLanguage)
        const formattedMenuArray = formatMenu(menuFromAPI)
        const menuObject = { ...formattedMenuArray }
        setMenu(menuObject)
      } catch (error) {
        setError(true)
        console.log(error.message)
      }
      setLoading(false)
    }
    getFoodAndCoMenu()
  }, [myLanguage])

  console.log('foodandcomenu', menu)
  return { menu, loading, error }
}

const formatMenu = (menu) => {
  const flattenedMenuArray = menu?.MenusForDays[0]?.SetMenus.map(
    (setMenu) => setMenu.Components
  ).flat()

  const formattedMenuArray = flattenedMenuArray?.map((item) => ({
    dish: item.slice(0, item.indexOf(' (')),
    diets: item.slice(item.indexOf('(') + 1, item.indexOf(')')).split(' ,')
  }))

  return formattedMenuArray
}
