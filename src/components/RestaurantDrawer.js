/**
 * @Author OskarWiiala
 * Drawer for displaying a specific restaurant's info in Map.js
 */

import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  IconButton,
  Drawer,
  Rating,
  Typography,
  CardMedia
} from '@mui/material'
import getTranslation from '../utils/Translations'
import DirectionsIcon from '@mui/icons-material/Directions'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import CloseIcon from '@mui/icons-material/Close'
import { ColorModeContext } from '../context/ColorModeContext'
import { getDesignTokens } from '../theme'

/**
 * @param {boolean} open is drawer open or not
 * @param {func} handleDrawerToggle handles opening and closing of restaurant info drawer in Map.js
 * @param {func} openWebsite handles opening of restaurant's website
 * @param {func} toggleModal handles opening and closing of directions modal in Map.js
 * @param {string} language language of app ('en', 'fi')
 * @param {string} restaurantBusinessStatus status of restaurant ('open', 'closed')
 * @param {string} restaurantIcon picture of restaurant in URL form
 * @param {string} restaurantName
 * @param {string} restaurantAddress
 * @param {number} restaurantRating supposed to be between 0 and 5
 * @param {string} distance distance from start point (user's initial location) to end point (restaurant's location)
 * @returns drawer component for displaying a specific restaurant's info
 */
const RestaurantDrawer = ({
  open,
  handleDrawerToggle,
  openWebsite,
  toggleModal,
  language,
  restaurantBusinessStatus,
  restaurantIcon,
  restaurantName,
  restaurantAddress,
  restaurantRating,
  distance
}) => {
  const { mode } = useContext(ColorModeContext)
  const restaurantOpenStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: restaurantBusinessStatus === 'open' ? getDesignTokens(mode).palette.success.main : getDesignTokens(mode).palette.error.main
  }

  return (
    <Drawer anchor='bottom' open={open} onClose={handleDrawerToggle} variant='temporary'>
      <Box sx={restaurantOpenStyle}>
        <Typography
          variant='body1'
          sx={{
            fontSize: { xs: '5vw', sm: '3vw', md: '2.5vw', lg: '2.5vw' },
            pl: '6px',
            alignSelf: 'center'
          }}
        >
          {getTranslation(language, restaurantBusinessStatus)}
        </Typography>
        <IconButton type='button' onClick={handleDrawerToggle}>
          <CloseIcon sx={closeIconStyle} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row' }
        }}
      >
        <Box
          sx={{
            flex: 1
          }}
        >
          <CardMedia
            sx={{
              height: { xs: '20%', sm: '95%', md: '95%', lg: '95%' },
              maxHeight: { xs: '100px', sm: '250px', md: '250px', lg: '250px' }
            }}
            component='img'
            height='225'
            image={restaurantIcon}
            alt={getTranslation(language, 'ariapicturerestaurant')}
          />
        </Box>
        <Box sx={{ display: 'flex', flex: 2, flexDirection: 'row' }}>
          <Box sx={{ padding: '12px', flex: 3 }}>
            <Typography variant='body1' sx={restaurantNameStyle}>
              {restaurantName}
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={restaurantAddressStyle}
            >
              {restaurantAddress}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: {
                  sm: 'space-between',
                  md: 'space-between',
                  lg: 'space-between'
                },
                flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row' }
              }}
            >
              <Rating
                name='half-rating-read'
                value={restaurantRating === undefined ? 0 : restaurantRating}
                defaultValue={0}
                precision={0.5}
                readOnly
                sx={{ alignSelf: { sm: 'center', md: 'center', lg: 'center' } }}
              />
              <Typography
                variant='body2'
                color='text.secondary'
                sx={restaurantAddressStyle}
              >
                {getTranslation(language, 'distance')}{' '}
                {distance === undefined ? 0 : distance}
              </Typography>
            </Box>
          </Box>
          <Box sx={iconContainerStyle}>
            <IconButton sx={iconButtonStyle} onClick={openWebsite}>
              <RestaurantMenuIcon sx={iconStyle} />
            </IconButton>
            <IconButton sx={iconButtonStyle} onClick={toggleModal}>
              <DirectionsIcon sx={iconStyle} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

const restaurantNameStyle = {
  fontSize: { xs: '5vw', sm: '3vw', md: '2.5vw', lg: '2.5vw' },
  padding: '5px'
}

const restaurantAddressStyle = {
  fontSize: { xs: '4vw', sm: '2vw', md: '1.8vw', lg: '1.8vw' },
  padding: '5px'
}

const iconContainerStyle = {
  display: 'flex',
  alignItems: 'end',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-around',
  pl: '12px',
  pr: '12px'
}

const closeIconStyle = {
  width: '25px',
  height: '25px'
}

const iconStyle = {
  width: { xs: '80%', sm: '80%', md: '80%', lg: '80%' },
  height: { xs: '80%', sm: '80%', md: '80%', lg: '80%' }
}

const iconButtonStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  flexDirection: 'column',
  boxShadow: 3,
  width: { xs: '80%', sm: '65%', md: '58%', lg: '45%' },
  height: { xs: '45%', sm: '45%', md: '45%', lg: '45%' },
  border: 'solid #000',
  borderWidth: '1px',
  borderRadius: '6px',
  borderColor: '#0250a3'
}

RestaurantDrawer.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  openWebsite: PropTypes.func,
  toggleModal: PropTypes.func,
  language: PropTypes.string,
  restaurantBusinessStatus: PropTypes.string,
  restaurantIcon: PropTypes.string,
  restaurantName: PropTypes.string,
  restaurantAddress: PropTypes.string,
  restaurantRating: PropTypes.number,
  distance: PropTypes.string
}

export default RestaurantDrawer
