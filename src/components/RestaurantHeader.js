import React from 'react'
import { Box, Grid, CardMedia, CardContent, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import OccupancyHistogram from '../components/OccupancyHistogram'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'

const RestaurantHeader = ({ name, photo, alt, address, postalcode }) => {
  const [cookies] = useCookies(['language'])

  const fontStyle = {
    fontSize: '1rem'
  }
  return (
    <Box sx={ { width: '100%' }}>
        <CardMedia component="img" image={photo} alt={alt} sx={{ height: { xs: 100, md: 160 } }} />
        <CardContent>
          <Grid container sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ pb: 0.5 }}>
                {name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={fontStyle}>{address}</Typography>
              <Typography variant="body2" sx={fontStyle}>{postalcode}</Typography>
              <Typography variant="body2" sx={{ color: 'green', fontWeight: 'bold', fontStyle } }>Open (placeholder)</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{getTranslation(cookies.language ? cookies.language : 'en', 'occupancy')}</Typography>
                <OccupancyHistogram />
            </Grid>
          </Grid>
        </CardContent>
    </Box>
  )
}

RestaurantHeader.propTypes = {
  name: PropTypes.string,
  photo: PropTypes.string,
  alt: PropTypes.string,
  address: PropTypes.string,
  postalcode: PropTypes.string
}
export default RestaurantHeader
