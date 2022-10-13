import { React, useState, useEffect } from 'react'
import sodexoMenuService from '../services/sodexomenu'
import { Card, Container, Typography } from '@mui/material'
import Moment from 'moment'
import 'moment/locale/fi'
import RestaurantMenu from '../components/RestaurantMenu'
import RestaurantHeader from '../components/RestaurantHeader'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'

const Home = () => {
  const [cookies] = useCookies(['language'])
  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState(null)

  const myLanguage = cookies.language ? cookies.language : 'en'

  Moment.locale(`${cookies.language ? cookies.language : 'en'}`)
  const currentDateApiFormat = Moment().format('YYYY-MM-DD')
  const currentDate = Moment().format('dddd DD-MM-YYYY')
  console.log(currentDate)

  useEffect(() => {
    const getSodexoMenu = async () => {
      setLoading(true)
      try {
        const menu = myLanguage === 'en'
          ? await sodexoMenuService.getMenuEn(currentDateApiFormat, '80')
          : await sodexoMenuService.getMenuFi(currentDateApiFormat, '80')

        const menuObject = { name: menu.meta.ref_title, menu: menu.courses }
        setMenu(menuObject)
        console.log('menuObject', menuObject)
      } catch (error) {
        console.error(error.message)
      }
      setLoading(false)
    }
    getSodexoMenu()
  }, [myLanguage])

  console.log(menu)
  console.log(currentDateApiFormat)

  return (
    <Container sx={ { display: 'flex', justifyContent: 'center' }}>
      {loading && <Typography>Loading...</Typography>}
        {!loading && (
            <Card elevation={3} sx={{ width: { xs: '100%', lg: '75%' }, mb: 4, mt: 2 }}>
            <RestaurantHeader
              name={getTranslation(cookies.language ? cookies.language : 'en', 'restaurant') + ' ' + menu?.name.slice(10)}
              address="Karakaari 7"
              postalcode="02610 Espoo"
            />
            <Typography variant="h5"
            sx={{ pl: 2 }}>
              {getTranslation(cookies.language ? cookies.language : 'en', 'menu')}
            </Typography>
            <Typography varinat="h6" sx={{ pl: 2, textTransform: 'capitalize' }}>
              {currentDate}
            </Typography>
              <RestaurantMenu
                menu={menu?.menu}
                restaurantType="sodexo"
              ></RestaurantMenu>
            </Card>
        )}
    </Container>
  )
}
export default Home
