import { React, useEffect, useState } from 'react'
import foodandcoMenuService from '../services/foodandcomenu'
import { Container, Box, Paper, Typography } from '@mui/material'
import Moment from 'moment'
import RestaurantMenu from '../components/RestaurantMenu'

const Menu = () => {
  const [todayMenu, setTodayMenu] = useState(null)

  useEffect(() => {
    const getFoodAndCoMenu = async () => {
      const menu = await foodandcoMenuService.getMenu('3202', 'en')
      const restaurantName = menu.RestaurantName
      const returnedMenuArray = menu.MenusForDays[0].SetMenus.map(setMenu => setMenu.Components).flat()
      const formattedMenuArray = returnedMenuArray.map((item) => ({
        dish: item.slice(0, item.indexOf(' (')),
        diets: item.slice(item.indexOf('(') + 1, item.indexOf(')'))
      }))
      setTodayMenu({ name: restaurantName, menu: { ...formattedMenuArray } })
    }
    getFoodAndCoMenu()
  }, [])

  const currentDate = Moment().format('dddd DD-MM-YYYY')
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
        {todayMenu && (
          <>
            <Typography variant="h4" sx={{ pb: 2 }}>{todayMenu.name}</Typography>
            <Paper elevation={3} sx={{ width: { xs: '100%', md: '50%' } }}>
              <RestaurantMenu
                menu={todayMenu.menu}
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
