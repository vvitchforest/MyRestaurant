import React, { useState, useContext } from 'react'
import { Container, Box, Tabs, Tab, Fab, Typography, alpha } from '@mui/material'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import campusRestaurants from '../utils/CampusRestaurants'
import TabPanel from '../components/TabPanel'
import RestaurantSection from '../components/RestaurantSection'
import getTranslation from '../utils/Translations'
import { ColorModeContext } from '../context/ColorModeContext'
import { getDesignTokens } from '../theme'
import useMediaQuery from '@mui/material/useMediaQuery'

/**
 * @Author Irina Konovalova
 * Page displaying campus restaurants' info and lunch menus
 */
const Home = () => {
  const [cookies] = useCookies(['language'])
  const [tabValue, setTabValue] = useState(0)
  const { mode } = useContext(ColorModeContext)
  const myLanguage = cookies.language ? cookies.language : 'en'
  const galaxyFold = useMediaQuery('(max-width:340px)')

  const handleTabsChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const containerStyle = {
    paddingLeft: galaxyFold ? 0 : 2,
    paddingRight: galaxyFold ? 0 : 2,
    marginBottom: 8
  }

  return (
    <Container sx={ containerStyle}>
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
            name={ restaurant.name.includes('Nokia One') ? getTranslation(myLanguage, 'restaurant') + ' ' + restaurant.name : restaurant.name }
            address={restaurant.address}
            postalcode={restaurant.postalcode}
            logo={restaurant.logo}
            lunchTime={restaurant.lunchTime}
            restaurantType={restaurant.type}
            id={restaurant.id}
          ></RestaurantSection>
          <Box
            sx={{
              backgroundColor: alpha(getDesignTokens(mode).palette.info.main, 0.1),
              mb: 1,
              p: { xs: 2.5, md: 5 },
              borderRadius: '1rem'
            }}
          >
            <Typography sx={{ pb: 0.25 }}>
              {myLanguage === 'en' ? 'Diet information' : 'Ruokavaliomerkinnät'}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.85rem',
                pb: 1
              }}
            >
              {myLanguage === 'en'
                ? restaurant?.diet_codes_explanation?.en
                : restaurant?.diet_codes_explanation?.fi}
            </Typography>
            <Typography sx={{ fontSize: '0.85rem' }}>
              {myLanguage === 'en'
                ? restaurant?.footer_text?.en
                : restaurant?.footer_text?.fi}
            </Typography>
          </Box>
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
          sx={{ position: 'fixed', bottom: 0, mb: 2 }}
        >
          {getTranslation(myLanguage, 'restaurantsNearby')}
        </Fab>
      </Box>
    </Container>
  )
}
export default Home
