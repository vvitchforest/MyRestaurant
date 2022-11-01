import { React, useState } from 'react'
import { Container, Box, CircularProgress, Tabs, Tab } from '@mui/material'
import RestaurantMenu from '../components/RestaurantMenu'
import Notification from '../components/Notification'
import TabPanel from '../components/TabPanel'
import FilterMenu from '../components/FilterMenu'
import RestaurantSection from '../components/RestaurantSection'
import { useCookies } from 'react-cookie'
import { useSodexoData } from '../hooks/useSodexoData'
import { useFoodAndCoData } from '../hooks/useFoodAndCoData'
import getTranslation from '../utils/Translations'

const Home = () => {
  const [cookies] = useCookies(['language'])
  const [filterDiets, setFilterDiets] = useState('')
  const [tabValue, setTabValue] = useState(0)
  const myLanguage = cookies.language ? cookies.language : 'en'

  const { menu: nokiaMenu, alert: nokiaAlert, loading: nokiaLoading } = useSodexoData('80')
  const { menu: dreamsCafeMenu, alert: dreamsCafeAlert, loading: dreamsCafeLoading } = useFoodAndCoData('3202')
  const { menu: metropoliaMenu, alert: metropoliaAlert, loading: metropoliaLoading } = useFoodAndCoData('3208')

  const menuToShow = !filterDiets.length
    ? nokiaMenu
    : {
        ...Object.values(nokiaMenu)?.filter((menuItem) =>
          menuItem?.recipes?.hideAll?.dietcodes.includes(filterDiets))
      }

  const dreamsCafeMenuToShow = !filterDiets.length
    ? dreamsCafeMenu?.menu
    : {
        ...Object.values(dreamsCafeMenu?.menu)?.filter((menuItem) =>
          menuItem?.diets.split(' ,').some(diet => diet === filterDiets))
      }

  console.log('fileted', filterDiets)

  const campusRestaurants = [
    {
      index: 0,
      name: `${getTranslation(myLanguage, 'restaurant')} Nokia One`,
      type: 'sodexo',
      address: 'Karakaari 7',
      postalcode: '02610 Espoo',
      menu: menuToShow,
      alert: nokiaAlert
    },
    {
      index: 1,
      name: 'Dreams Cafe',
      type: 'foodandco',
      address: 'Karaportti 4',
      postalcode: '02610 Espoo',
      menu: dreamsCafeMenuToShow,
      alert: dreamsCafeAlert
    },
    {
      index: 2,
      name: 'Metropolia',
      type: 'foodandco',
      address: 'Karakaarenkuja 6',
      postalcode: '02610 Espoo',
      menu: metropoliaMenu?.menu,
      alert: metropoliaAlert
    }

  ]
  const handleFilterChange = (event) => {
    setFilterDiets(event.target.value)
  }

  const handleTabsChange = (event, newValue) => {
    console.log(newValue)
    setTabValue(newValue)
  }

  if (nokiaLoading || dreamsCafeLoading || metropoliaLoading) {
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
      {campusRestaurants.map((restaurant) => (
      <TabPanel value={tabValue} index={restaurant.index} key={restaurant.index}>
        <RestaurantSection
          name={restaurant.name}
          address={restaurant.address}
          postalcode={restaurant.postalcode}
        >
          {restaurant.menu
            ? (
              <>
                <FilterMenu
                  filterValues={filterDiets}
                  handleChange={handleFilterChange}
                  clearFilter={() => setFilterDiets('')}
                  clearButtonDisplay={!filterDiets.length ? 'none' : 'block'}
                  restaurantType={restaurant.type}
                  />
                <RestaurantMenu
                  menu={restaurant.menu}
                  restaurantType={restaurant.type}
                  />
              </>
              )
            : (
                <Notification alert={restaurant.alert} />
              )}
          </RestaurantSection>
        </TabPanel>
      ))}
      </Container>
  )
}
export default Home
