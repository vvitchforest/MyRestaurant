import React from 'react'
import { Box, Grid, CardContent, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import OccupancyHistogram from '../components/OccupancyHistogram'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'
import useMediaQuery from '@mui/material/useMediaQuery'

const RestaurantHeader = ({ name, address, postalcode }) => {
  const [cookies] = useCookies(['language'])
  const mediumScreen = useMediaQuery('(min-width:600px)')

  const fontStyle = {
    fontSize: '1rem'
  }
  return (
    <Box sx={ { width: '100%' }}>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ pb: 0.5 }}>
                {name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={fontStyle}>{address}</Typography>
              <Typography variant="body2" sx={fontStyle}>{postalcode}</Typography>
              <Typography variant="body2" sx={{ color: 'green', fontWeight: 'bold', fontStyle } }>Open (placeholder)</Typography>
            </Grid>
            <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6">{getTranslation(cookies.language ? cookies.language : 'en', 'occupancy')}</Typography>
                <OccupancyHistogram width={mediumScreen ? 600 : 300 } height={mediumScreen ? 300 : 100} />
            </Grid>
          </Grid>
        </CardContent>
    </Box>
  )
}

RestaurantHeader.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  postalcode: PropTypes.string
}
export default RestaurantHeader
