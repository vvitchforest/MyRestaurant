import React, { useEffect, useState } from 'react'
import sodexoMenuService from '../services/sodexomenu'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'
import { TbFaceIdError } from 'react-icons/tb'
import Moment from 'moment'

export const useSodexoData = (restaurantId) => {
  const [menu, setMenu] = useState(null)
  const [alert, setAlert] = useState(null)
  const [loading, setLoading] = useState(true)
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
