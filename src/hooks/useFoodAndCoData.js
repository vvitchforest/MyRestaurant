import { useEffect, useState } from 'react'
import foodandcoMenuService from '../services/foodandcomenu'
import { useCookies } from 'react-cookie'

/**
 * A custom hook for fetching and formatting current date's FoodAndCo restaurant data from FoodAndCo API
 * @Author Irina Konovalova
 * @param {string} restaurantId
 * @returns menu, loading, and error states
 */

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

  return { menu, loading, error }
}

/**
   * Formats the menu array passed as a parameter.
   * Because SetMenus is an array that contains sub-arrays, it is first flattened i.e. concatenated into a single array.
   * Formatted array is created of objects that are formatted to match the format of useSodexoData-hook.
   * @param {array} menu
   * @returns formatted menu array
   */
const formatMenu = (menu) => {
  const flattenedMenuArray = menu?.MenusForDays[0]?.SetMenus.map(
    SetMenuItem => SetMenuItem.Components).flat()

  const formattedMenuArray = flattenedMenuArray?.map((item) => ({
    dish: item.slice(0, item.indexOf(' (')),
    diets: item.slice(item.indexOf('(') + 1, item.indexOf(')')).split(' ,')
  }))

  console.log(formattedMenuArray)
  return formattedMenuArray
}
