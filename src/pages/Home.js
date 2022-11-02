import { React, useState } from 'react'
import { Container, Box, CircularProgress, Tabs, Tab, Alert, Fab } from '@mui/material'
import { Link } from 'react-router-dom'
import RestaurantMenu from '../components/RestaurantMenu'
import Notification from '../components/Notification'
import TabPanel from '../components/TabPanel'
import FilterMenu from '../components/FilterMenu'
import RestaurantSection from '../components/RestaurantSection'
import { useCookies } from 'react-cookie'
import { useSodexoData } from '../hooks/useSodexoData'
import { useFoodAndCoData } from '../hooks/useFoodAndCoData'
import getTranslation from '../utils/Translations'
import { BiSad } from 'react-icons/bi'

const Home = () => {
  const [cookies] = useCookies(['language'])
  const [filterDiet, setFilterDiet] = useState('')
  const [tabValue, setTabValue] = useState(0)

  const myLanguage = cookies.language ? cookies.language : 'en'

  const { menu: nokiaMenu, alert: nokiaAlert, loading: nokiaLoading } = useSodexoData('80')
  const { menu: dreamsCafeMenu, alert: dreamsCafeAlert, loading: dreamsCafeLoading } = useFoodAndCoData('3202')
  const { menu: metropoliaMenu, alert: metropoliaAlert, loading: metropoliaLoading } = useFoodAndCoData('3208')

  const menuToShow = !filterDiet.length
    ? nokiaMenu
    : {
        ...Object.values(nokiaMenu)?.filter((menuItem) =>
          menuItem?.recipes?.hideAll?.dietcodes.includes(filterDiet))
      }

  console.log(menuToShow)
  const dreamsCafeMenuToShow = !filterDiet.length
    ? dreamsCafeMenu?.menu
    : {
        ...Object.values(dreamsCafeMenu?.menu)?.filter((menuItem) =>
          menuItem?.diets.split(' ,').some(diet => diet === filterDiet))
      }

  const metropoliaMenuToShow = !filterDiet.length
    ? dreamsCafeMenu?.menu
    : {
        ...Object.values(metropoliaMenu?.menu)?.filter((menuItem) =>
          menuItem?.diets.split(' ,').some(diet => diet === filterDiet))
      }

  const campusRestaurants = [
    {
      index: 0,
      name: `${getTranslation(myLanguage, 'restaurant')} Nokia One`,
      type: 'sodexo',
      address: 'Karakaari 7',
      postalcode: '02610 Espoo',
      lunchTime: 'placeholder',
      menu: menuToShow,
      alert: nokiaAlert
    },
    {
      index: 1,
      name: 'Dreams Cafe',
      type: 'foodandco',
      address: 'Karaportti 4',
      postalcode: '02610 Espoo',
      lunchTime: 'placeholder',
      menu: dreamsCafeMenuToShow,
      alert: dreamsCafeAlert
    },
    {
      index: 2,
      name: 'Metropolia',
      type: 'foodandco',
      address: 'Karakaarenkuja 6',
      postalcode: '02610 Espoo',
      lunchTime: 'placeholder',
      menu: metropoliaMenuToShow,
      alert: metropoliaAlert
    }

  ]
  const handleFilterChange = (event) => {
    setFilterDiet(event.target.value)
  }

  const handleTabsChange = (event, newValue) => {
    console.log(newValue)
    setTabValue(newValue)
    setFilterDiet('')
  }

  if (nokiaLoading || dreamsCafeLoading || metropoliaLoading) {
    return (
    <Box width='100%' height='92vh' display='flex' justifyContent='center' alignItems='center'>
      <CircularProgress/>
    </Box>)
  }

  return (
    <Container >
      <Tabs value={tabValue} onChange={handleTabsChange} centered sx={{ my: 2 }}>
        <Tab label="Nokia One"/>
        <Tab label="Dreams Cafe"/>
        <Tab label="Metropolia"/>
      </Tabs>
      {campusRestaurants.map((restaurant) => (
      <TabPanel value={tabValue} index={restaurant.index} key={restaurant.index}>
        <RestaurantSection
          name={restaurant.name}
          address={restaurant.address}
          postalcode={restaurant.postalcode}
          lunchTime={restaurant.lunchTime}
        >
          {restaurant.menu
            ? (
              <>
                <FilterMenu
                  filterValues={filterDiet}
                  handleChange={handleFilterChange}
                  clearFilter={() => setFilterDiet('')}
                  clearButtonDisplay={!filterDiet.length ? 'none' : 'block'}
                  restaurantType={restaurant.type}
                  />
                  { filterDiet.length !== 0 && Object.keys(restaurant.menu).length === 0 &&
                    <Alert severity="info" icon={<BiSad/>} sx={{ mx: { xs: 2, sm: 5 }, my: 2 }}>{getTranslation(myLanguage, 'noMeals')}.</Alert>}
                <RestaurantMenu
                  menu={restaurant.menu}
                  restaurantType={restaurant.type}
                  />
              </>
              )
            : (
                <Notification alert={restaurant.alert} />
              )}
              <Box width="100%" display="flex" justifyContent="center">
                <Fab
                  variant="extended"
                  component={Link} to="/restaurants"
                  size="medium" color="primary"
                  aria-label="other-restaurants-nearby"
                  sx={{ position: 'fixed', bottom: 0, mb: 2 }}>
                  Other restaurants nearby
                </Fab>
              </Box>
          </RestaurantSection>
        </TabPanel>
      ))}
      </Container>
  )
}
export default Home
