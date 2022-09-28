import { React, useState, useEffect } from 'react'
import sodexoMenuService from '../services/sodexomenu'
import {
  Container,
  Box,
  Paper,
  Typography
} from '@mui/material'
import Moment from 'moment'
import RestaurantMenu from '../components/RestaurantMenu'

const Home = () => {
  const [menu, setMenu] = useState(null)

  const currentDateApiFormat = Moment().format('YYYY-MM-DD')
  const currentDate = Moment().format('dddd DD-MM-YYYY')

  useEffect(() => {
    const getSodexoMenu = async () => {
      const menu = await sodexoMenuService.getMenu(currentDateApiFormat)
      setMenu(menu.courses)
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
        <Paper elevation={3} sx={ { width: { xs: '100%', md: '50%' } } }>
          { menu &&
            <RestaurantMenu menu={menu}></RestaurantMenu>
          }
        </Paper>
      </Box>
    </Container>
  )
}
export default Home
