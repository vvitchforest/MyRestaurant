import { React, useEffect, useState } from 'react'
import foodandcoMenuService from '../services/foodandcomenu'
import { Container, Box, Paper, Typography } from '@mui/material'
import Moment from 'moment'
import RestaurantMenu from '../components/RestaurantMenu'
import LoadingMenu from '../components/LoadingMenu'
import { useCookies } from 'react-cookie'

const Menu = () => {
  const [cookies] = useCookies(['language'])
  const [loading, setLoading] = useState(true)
  const [todayMenu, setTodayMenu] = useState(null)

  const myLanguage = cookies.language ? cookies.language : 'en'
  const currentDate = Moment().format('dddd DD-MM-YYYY')

  useEffect(() => {
    const getFoodAndCoMenu = async () => {
      setLoading(true)
      try {
        const menu = await foodandcoMenuService.getMenu('3202', myLanguage)
        const restaurantName = menu.RestaurantName
        const formattedMenuArray = formatMenu(menu)
        const menuObject = { ...formattedMenuArray }
        setTodayMenu({ name: restaurantName, menu: menuObject })
      } catch (error) {
        console.log(error.message)
      }
      setLoading(false)
    }
    getFoodAndCoMenu()
  }, [myLanguage])

  const formatMenu = (returnedMenu) => {
    const flattenedMenuArray = returnedMenu.MenusForDays[0].SetMenus.map(
      (setMenu) => setMenu.Components
    ).flat()
    const formattedMenuArray = flattenedMenuArray.map((item) => ({
      dish: item.slice(0, item.indexOf(' (')),
      diets: item.slice(item.indexOf('(') + 1, item.indexOf(')'))
    }))
    return formattedMenuArray
  }
  console.log('foodandcomenu', todayMenu)

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 1
        }}
      >
        <Typography varinat="h6" sx={{ p: 2 }}>
          {currentDate}
        </Typography>
        {loading && <LoadingMenu restaurantType="foodandco"/> }
        {!loading && (
          <>
            <Typography variant="h4" sx={{ pb: 2 }}>
              {todayMenu?.name}
            </Typography>
            <Paper elevation={3} sx={{ width: { xs: '100%', md: '50%' } }}>
              <RestaurantMenu
                menu={todayMenu?.menu}
                restaurantType="foodandco"
              ></RestaurantMenu>
            </Paper>
          </>
        )}
      </Box>
    </Container>
  )
}
export default Menu
