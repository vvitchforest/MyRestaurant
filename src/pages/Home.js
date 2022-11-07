import { React, useState } from 'react'
import { Container, Box, Tabs, Tab, Fab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import TabPanel from '../components/TabPanel'
import RestaurantSection from '../components/RestaurantSection'
import getTranslation from '../utils/Translations'

/**
 * @Author Irina Konovalova
 * Page displaying campus restaurants' info and lunch menus
 */
const Home = () => {
  const [cookies] = useCookies(['language'])
  const [tabValue, setTabValue] = useState(0)

  const myLanguage = cookies.language ? cookies.language : 'en'

  const campusRestaurants = [
    {
      id: '80',
      name: `${getTranslation(myLanguage, 'restaurant')} Nokia One`,
      type: 'sodexo',
      address: 'Karakaari 7',
      postalcode: '02610 Espoo',
      lunchTime: 'placeholder'
    },
    {
      id: '3202',
      name: 'Dreams Cafe',
      type: 'foodandco',
      address: 'Karaportti 4',
      postalcode: '02610 Espoo',
      lunchTime: 'placeholder'
    },
    {

      id: '3208',
      name: 'Metropolia',
      type: 'foodandco',
      address: 'Karakaarenkuja 6',
      postalcode: '02610 Espoo',
      lunchTime: 'placeholder'
    }

  ]

  const handleTabsChange = (event, newValue) => {
    console.log(newValue)
    setTabValue(newValue)
  }

  return (
    <Container >
      <Tabs value={tabValue} onChange={handleTabsChange} centered sx={{ my: 2 }}>
        <Tab label="Nokia One"/>
        <Tab label="Dreams Cafe"/>
        <Tab label="Metropolia"/>
      </Tabs>
      {campusRestaurants.map((restaurant, index) => (
      <TabPanel value={tabValue} index={index} key={index}>
        <RestaurantSection
          name={restaurant.name}
          address={restaurant.address}
          postalcode={restaurant.postalcode}
          lunchTime={restaurant.lunchTime}
          restaurantType={restaurant.type}
          id={restaurant.id}
        >
        </RestaurantSection>
      </TabPanel>
      ))}
       <Box width="100%" display="flex" justifyContent="center">
        <Fab
          color='secondary'
          variant="extended"
          component={Link} to="/restaurants"
          size="medium"
          aria-label="other-restaurants-nearby"
          sx={{ position: 'fixed', bottom: 0, mb: 2 }}>
          Other restaurants nearby
        </Fab>
      </Box>
      </Container>
  )
}
export default Home
