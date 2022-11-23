import React, { useState } from 'react'
import { Container, Box, Tabs, Tab, Fab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import campusRestaurants from '../utils/CampusRestaurants'
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

  const handleTabsChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Container sx={{ mb: 5 }}>
      <Tabs
        value={tabValue}
        onChange={handleTabsChange}
        centered
        sx={{ my: 2 }}
      >
        <Tab label="Nokia One" sx={{ ml: 1 }} />
        <Tab label="Dreams Cafe" />
        <Tab label="Metropolia" sx={{ mr: 1 }} />
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
          ></RestaurantSection>
        </TabPanel>
      ))}
      <Box width="100%" display="flex" justifyContent="center">
        <Fab
          color="primary"
          variant="extended"
          component={Link}
          to="/restaurants"
          size="medium"
          aria-label="other-restaurants-nearby"
          sx={{ position: 'fixed', bottom: 0, mb: 4 }}
        >
          {getTranslation(myLanguage, 'restaurantsNearby')}
        </Fab>
      </Box>
    </Container>
  )
}
export default Home
