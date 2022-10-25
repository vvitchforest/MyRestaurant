import { React, useEffect, useState } from 'react'
import foodandcoMenuService from '../services/foodandcomenu'
import { Container, Paper, Typography } from '@mui/material'
import Moment from 'moment'
import 'moment/locale/fi'
import RestaurantMenu from '../components/RestaurantMenu'
import LoadingMenu from '../components/LoadingMenu'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'
import Notification from '../components/Notification'
import { TbFaceIdError } from 'react-icons/tb'

const Menu = () => {
  const [cookies] = useCookies(['language'])
  const [loading, setLoading] = useState(true)
  const [todayMenu, setTodayMenu] = useState(null)
  const [alert, setAlert] = useState(null)

  const myLanguage = cookies.language ? cookies.language : 'en'
  Moment.locale(myLanguage)
  const currentDate = Moment().format('dddd DD-MM-YYYY')

  useEffect(() => {
    const getFoodAndCoMenu = async () => {
      setLoading(true)
      try {
        const menuFromAPI = await foodandcoMenuService.getMenu('3202', myLanguage)
        const restaurantName = menuFromAPI.RestaurantName
        const formattedMenuArray = formatMenu(menuFromAPI)
        const menuObject = { ...formattedMenuArray }
        setTodayMenu({ name: restaurantName, menu: menuObject })
        if (todayMenu === null) setAlert({ variant: 'info', message: getTranslation(myLanguage, 'menuNull') })
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
  console.log('foodandcomenu', todayMenu)

  if (loading) {
    return (
      <Container sx={{ width: { xs: '100%', md: '50%' } }}>
        <LoadingMenu restaurantType="foodandco"/>
      </Container>
    )
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography varinat="h6" sx={{ p: 2, textTransform: 'capitalize' }}>
          {currentDate}
        </Typography>
          <Typography variant="h4" sx={{ pb: 2, textAlign: 'center' }}>
            {todayMenu?.name}
          </Typography>
          {todayMenu
            ? (
              <Paper elevation={3} sx={{ width: { xs: '100%', md: '50%' } }}>
                  <RestaurantMenu
                    menu={todayMenu.menu}
                    restaurantType="foodandco"
                  />
                   </Paper>
              )
            : (
                <Notification
                    alert={alert}
                />
              )
          }
    </Container>
  )
}
export default Menu
