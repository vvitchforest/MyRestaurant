import React, { useEffect, useState } from 'react'
import foodandcoMenuService from '../services/foodandcomenu'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'
import { TbFaceIdError } from 'react-icons/tb'

export const useFoodAndCoData = (restaurantId) => {
  const [menu, setMenu] = useState(null)
  const [alert, setAlert] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cookies] = useCookies(['language'])
  const myLanguage = cookies.language ? cookies.language : 'en'

  useEffect(() => {
    const getFoodAndCoMenu = async () => {
      setLoading(true)
      try {
        const menuFromAPI = await foodandcoMenuService.getMenu(restaurantId, myLanguage)
        const restaurantName = menuFromAPI.RestaurantName
        const lunchTime = menuFromAPI.MenusForDays[0].LunchTime
        const formattedMenuArray = formatMenu(menuFromAPI)
        const menuObject = { ...formattedMenuArray }
        setMenu({ name: restaurantName, lunch: lunchTime, menu: menuObject })
        if (menu === null) setAlert({ variant: 'info', message: getTranslation(myLanguage, 'menuNull') })
      } catch (error) {
        setAlert({ variant: 'error', message: getTranslation(myLanguage, 'menuError'), icon: <TbFaceIdError /> })
        console.log(error.message)
      }
      setLoading(false)
    }
    getFoodAndCoMenu()
  }, [myLanguage])

  const formatMenu = (menu) => {
    const flattenedMenuArray = menu.MenusForDays[0].SetMenus.map(
      (setMenu) => setMenu.Components
    ).flat()
    const formattedMenuArray = flattenedMenuArray.map((item) => ({
      dish: item.slice(0, item.indexOf(' (')),
      diets: item.slice(item.indexOf('(') + 1, item.indexOf(')'))
    }))
    return formattedMenuArray
  }
  console.log('foodandcomenu', menu)
  return { menu, alert, loading }
}
