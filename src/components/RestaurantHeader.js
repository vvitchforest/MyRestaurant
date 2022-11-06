import React from 'react'
import { Box, Grid, CardContent, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import OccupancyHistogram from '../components/OccupancyHistogram'
import useMediaQuery from '@mui/material/useMediaQuery'

/**
 * @Author Irina Konovalova
 * Header displaying restaurant info (name, address, lunch time) of campus restaurant.
 * Used in RestaurantSection component.
 * @param {string} name name of the restaurant
 * @param {string} address address of the restaurant
 * @param {string} postalcode postal code of the restaurant
 * @param {string} lunchTime lunch time in the restaurant
 * @returns Component for displaying campus restaurant info and occupancy historam for restaurant Nokia One.
 */

const RestaurantHeader = ({ name, address, postalcode, lunchTime }) => {
  const mediumScreen = useMediaQuery('(min-width:750px)')

  const fontStyle = {
    fontSize: '1rem'
  }
  return (
    <Box sx={{ width: '100%' }}>
      <CardContent sx={{ p: 0 }}>
        <Grid container sx={{ width: '100%' }}>
          <Grid item xs={12} sx={{ pl: { xs: 2, sm: 5 }, pt: 2 }}>
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, pb: 0.5 }}
            >
              {name}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ pl: { xs: 2, sm: 5 } }}>
            <Typography variant="body2" sx={fontStyle}>
              {address}
            </Typography>
            <Typography variant="body2" sx={fontStyle}>
              {postalcode}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'green', fontWeight: 'bold', fontStyle }}
            >
              {lunchTime}
            </Typography>
          </Grid>
          {name?.includes('Nokia One') &&
          (<Grid item xs={12} sx={{ pb: 0 }}>
            <Box
              sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <OccupancyHistogram
                width={mediumScreen ? 475 : 250}
                height={mediumScreen ? 237 : 175}
              />
            </Box>
          </Grid>)
          }
        </Grid>
      </CardContent>
    </Box>
  )
}

RestaurantHeader.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  postalcode: PropTypes.string,
  lunchTime: PropTypes.string
}
export default RestaurantHeader
