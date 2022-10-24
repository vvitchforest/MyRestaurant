import { React, useState, useEffect } from 'react'
import sodexoMenuService from '../services/sodexomenu'
import { Container, Box, Paper, Typography } from '@mui/material'
import Moment from 'moment'
import RestaurantMenu from '../components/RestaurantMenu'
// import { useCookies } from 'react-cookie'
// import getTranslation from '../utils/Translations'

const Home = () => {
  // const [cookies] = useCookies(['language'])

  const [menu, setMenu] = useState(null)

  const currentDateApiFormat = Moment().format('YYYY-MM-DD')
  const currentDate = Moment().format('dddd DD-MM-YYYY')

  useEffect(() => {
    const getSodexoMenu = async () => {
      const menu = await sodexoMenuService.getMenu(currentDateApiFormat, '80', 'en')
      const menuObject = { name: menu.meta.ref_title, menu: menu.courses }
      setMenu(menuObject)
      console.log('menuObject', menuObject)
    }
    getSodexoMenu()
  }, [])

  console.log(menu)
  console.log(currentDateApiFormat)

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
        {menu && (
          <>
            <Typography variant="h4" sx={{ pb: 2 }}>
              {menu.name}
            </Typography>

            <Paper elevation={3} sx={{ width: { xs: '100%', md: '50%' } }}>
              <RestaurantMenu
                menu={menu.menu}
                restaurantType="sodexo"
              ></RestaurantMenu>
            </Paper>
          </>
        )}
      </Box>
    </Container>
  )
}
export default Home
