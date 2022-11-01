import { React, useState } from 'react'
import { Container, Box, CircularProgress, Tabs, Tab } from '@mui/material'
import Moment from 'moment'
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
  const currentDateApiFormat = Moment().format('YYYY-MM-DD')

  const { menu: nokiaMenu, alert: nokiaAlert, loading: nokiaLoading } = useSodexoData(currentDateApiFormat, '80')
  const { menu: dreamsCafeMenu, alert: dreamsCafeAlert, loading: dreamsCafeLoading } = useFoodAndCoData('3202')
  const { menu: metropoliaMenu, alert: metropoliaAlert, loading: metropoliaLoading } = useFoodAndCoData('3208')

  const menuToShow = !filterDiets.length
    ? nokiaMenu
    : {
        ...Object.values(nokiaMenu)?.filter((menuItem) =>
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
      <TabPanel value={tabValue} index={0}>
        <RestaurantSection
          name={`${getTranslation(myLanguage, 'restaurant')} Nokia One`}
          address="Karakaari 7"
          postalcode="02610 Espoo"
          >
            {nokiaMenu
              ? (
                <>
                  <FilterMenu
                    filterValues={filterDiets}
                    handleChange={handleFilterChange}
                    clearFilter={() => setFilterDiets('')}
                    clearButtonDisplay={!filterDiets.length ? 'none' : 'block'}/>
                  <RestaurantMenu
                    menu={menuToShow}
                    restaurantType="sodexo"
                    />
                </>
                )
              : (
                  <Notification alert={nokiaAlert} />
                )
              }
          </RestaurantSection>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
        <RestaurantSection
          name={dreamsCafeMenu?.name}
          address="Karakaari 7"
          postalcode="02610 Espoo"
          >
            {dreamsCafeMenu
              ? (
                  <RestaurantMenu
                    menu={dreamsCafeMenu.menu}
                    restaurantType="foodandco"
                  />
                )
              : (
                  <Notification alert={dreamsCafeAlert} />
                )
              }
          </RestaurantSection>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
        <RestaurantSection
          name={metropoliaMenu?.name}
          address="Karakaari 7"
          postalcode="02610 Espoo"
          >
            {metropoliaMenu
              ? (
                  <RestaurantMenu
                    menu={metropoliaMenu.menu}
                    restaurantType="foodandco"
                  />
                )
              : (
                  <Notification alert={metropoliaAlert} />
                )
              }
          </RestaurantSection>
        </TabPanel>
      </Container>
  )
}
export default Home
