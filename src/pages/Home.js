import { React, useState, useEffect } from 'react'
import sodexoMenuService from '../services/sodexomenu'
import { Card, Container, Typography, Box, CircularProgress } from '@mui/material'
import Moment from 'moment'
import 'moment/locale/fi'
import RestaurantMenu from '../components/RestaurantMenu'
import RestaurantHeader from '../components/RestaurantHeader'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'
import Notification from '../components/Notification'
import FilterMenu from '../components/FilterMenu'
import { TbFaceIdError } from 'react-icons/tb'

const Home = () => {
  const [cookies] = useCookies(['language'])
  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState(null)
  const [alert, setAlert] = useState(null)
  const [filterDiets, setFilterDiets] = useState('')

  const myLanguage = cookies.language ? cookies.language : 'en'
  Moment.locale(myLanguage)
  const currentDateApiFormat = Moment().format('2022-MM-DD')
  const currentDate = Moment().format('dddd DD-MM-YYYY')

  useEffect(() => {
    const getSodexoMenu = async () => {
      setLoading(true)
      try {
        const menuFromAPI =
          myLanguage === 'en'
            ? await sodexoMenuService.getMenuEn(currentDateApiFormat, '80')
            : await sodexoMenuService.getMenuFi(currentDateApiFormat, '80')

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

  console.log(filterDiets)

  /* I tried this: Object.values(menu)?.filter((menuItem) =>
  filterDiets.every(diet => menuItem?.recipes?.hideAll?.dietcodes.includes(diet)) */

  const menuToShow = !filterDiets.length
    ? menu
    : {
        ...Object.values(menu)?.filter((menuItem) =>
          menuItem?.recipes?.hideAll?.dietcodes.includes(filterDiets))
      }
  console.log(menuToShow)

  const handleFilterChange = (event) => {
    setFilterDiets(event.target.value)
  }

  if (loading) {
    return (
    <Box width='100%' height='92vh' display='flex' justifyContent='center' alignItems='center'>
      <CircularProgress/>
    </Box>)
  }

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        elevation={3}
        sx={{ width: { xs: '100%', md: '75%', lg: '60%' }, mb: 2, mt: 2 }}
        >
        <RestaurantHeader
        name={`${getTranslation(myLanguage, 'restaurant')} Nokia One`}
        address="Karakaari 7"
        postalcode="02610 Espoo"
        />
        <Typography variant="h5" sx={{ pl: { xs: 2, sm: 5 } }}>
          {getTranslation(myLanguage, 'menu')}
          </Typography>
          <Typography sx={{ pl: { xs: 2, sm: 5 }, textTransform: 'capitalize' }}>
            {currentDate}
          </Typography>
            {menu
              ? (
                <>
                  <Box width='100%' display='flex' justifyContent='flex-end'>
                    <FilterMenu filterValues={filterDiets} handleChange={handleFilterChange} />
                  </Box>
                  <RestaurantMenu
                    menu={menuToShow}
                    restaurantType="sodexo"
                  />
                </>
                )
              : (
                <Notification
                  alert={alert}
                />
                )
          }
        </Card>
      </Container>
  )
}
export default Home
