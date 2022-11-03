import { useEffect, useState } from 'react'
import sodexoMenuService from '../services/sodexomenu'
import { useCookies } from 'react-cookie'
import Moment from 'moment'

export const useSodexoData = (restaurantId) => {
  const [menu, setMenu] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [cookies] = useCookies(['language'])

  const myLanguage = cookies.language ? cookies.language : 'en'
  const currentDateApiFormat = Moment().format('YYYY-MM-DD')

  useEffect(() => {
    const getSodexoMenu = async () => {
      setLoading(true)
      try {
        const menuFromAPI =
          myLanguage === 'en'
            ? await sodexoMenuService.getMenuEn(currentDateApiFormat, restaurantId)
            : await sodexoMenuService.getMenuFi(currentDateApiFormat, restaurantId)

        const formattedMenuArray = formatMenu(menuFromAPI.courses)
        const menuObject = { ...formattedMenuArray }
        setMenu(menuObject)
        console.log('sodexo', menuObject)
      } catch (error) {
        setError(true)
        console.log(error)
      }
      setLoading(false)
    }
    getSodexoMenu()
  }, [myLanguage])

  const formatMenu = (menu) => {
    // for days when there is no menu
    if (menu === null) return {}
    const formattedMenuArray = Object.values(menu).map(menuItem =>
      ({
        dish: cookies.language === 'en' ? menuItem?.title_en : menuItem?.title_fi,
        diets: menuItem?.recipes?.hideAll?.dietcodes.split(', '),
        title: menuItem?.category,
        price: menuItem?.price,
        allergens: menuItem?.additionalDietInfo?.allergens
      })
    )

    return formattedMenuArray
  }

  return { menu, loading, error }
}
