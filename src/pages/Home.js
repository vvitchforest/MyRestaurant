import { React, useState, useEffect } from 'react'
import sodexoMenuService from '../services/sodexomenu'
import foodandcoMenuService from '../services/foodandcomenu'
import { Card, Container, Typography, Box, CircularProgress, Tabs, Tab } from '@mui/material'
import Moment from 'moment'
import 'moment/locale/fi'
import RestaurantMenu from '../components/RestaurantMenu'
import RestaurantHeader from '../components/RestaurantHeader'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'
import Notification from '../components/Notification'
import TabPanel from '../components/TabPanel'
import FilterMenu from '../components/FilterMenu'
import { TbFaceIdError } from 'react-icons/tb'

const Home = () => {
  const [cookies] = useCookies(['language'])
  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState(null)
  const [todayMenu, setTodayMenu] = useState(null)
  const [alert, setAlert] = useState(null)
  const [filterDiets, setFilterDiets] = useState('')
  const [tabValue, setTabValue] = useState(0)

  const myLanguage = cookies.language ? cookies.language : 'en'
  Moment.locale(myLanguage)
  const currentDateApiFormat = Moment().format('YYYY-MM-DD')
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

  console.log(filterDiets)

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

  const handleTabsChange = (event, newValue) => {
    console.log(newValue)
    setTabValue(newValue)
  }

  if (loading) {
    return (
    <Box width='100%' height='92vh' display='flex' justifyContent='center' alignItems='center'>
      <CircularProgress/>
    </Box>)
  }

  return (
    <Container >
      <Tabs value={tabValue} onChange={handleTabsChange} centered sx={{ my: 2, pt: 2 }}>
        <Tab label="Nokia One"/>
        <Tab label="Dreams Cafe"/>
        <Tab label="Metropolia"/>
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <Box display="flex" justifyContent="center">
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
                    <Box display='flex' justifyContent='flex-start'>
                      <FilterMenu filterValues={filterDiets} handleChange={handleFilterChange} clearFilter={() => setFilterDiets('')} clearButtonDisplay={!filterDiets.length ? 'none' : 'block'}/>
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
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Box display="flex" justifyContent="center">
            <Card elevation={3}
            sx={{ width: { xs: '100%', md: '75%', lg: '60%' }, mb: 2, mt: 2 }}>
              <Typography varinat="h6" sx={{ p: 2, textTransform: 'capitalize' }}>
                {currentDate}
              </Typography>
              <Typography variant="h4" sx={{ pb: 2, textAlign: 'center' }}>
                {todayMenu?.name}
              </Typography>
              {todayMenu
                ? (
                  <RestaurantMenu
                    menu={todayMenu.menu}
                    restaurantType="foodandco"
                  />
                  )
                : (
                <Notification
                    alert={alert}
                />
                  )
          }

            </Card>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>Metropolia</TabPanel>
      </Container>
  )
}
export default Home
