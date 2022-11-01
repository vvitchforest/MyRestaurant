import React, { useEffect, useState } from 'react'
import sodexoMenuService from '../services/sodexomenu'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'
import { TbFaceIdError } from 'react-icons/tb'

export const useSodexoData = (currentDate, restaurantId) => {
  const [menu, setMenu] = useState(null)
  const [alert, setAlert] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cookies] = useCookies(['language'])

  const myLanguage = cookies.language ? cookies.language : 'en'

  useEffect(() => {
    const getSodexoMenu = async () => {
      setLoading(true)
      try {
        const menuFromAPI =
          myLanguage === 'en'
            ? await sodexoMenuService.getMenuEn(currentDate, restaurantId)
            : await sodexoMenuService.getMenuFi(currentDate, restaurantId)

        setMenu(menuFromAPI.courses)
        if (menu === null) setAlert({ variant: 'info', message: getTranslation(myLanguage, 'menuNull') })
      } catch (error) {
        setAlert({ variant: 'error', message: getTranslation(myLanguage, 'menuError'), icon: <TbFaceIdError /> })
        console.log(error)
      }
      setLoading(false)
    }
    getSodexoMenu()
  }, [myLanguage])

  return { menu, alert, loading }
}
